"""
Community AI Tools service.

Enables members to register and execute their own AI tools/gifts,
creating an extensible ecosystem of Kingdom-focused AI capabilities.
"""

import httpx
import time
from typing import Dict, Any, Optional
from supabase import Client

from app.schemas.community_tools import (
    CommunityToolRequest,
    CommunityToolResponse,
    ToolRegistration,
    RegisteredTool,
)


class CommunityToolsService:
    """
    Service for managing and executing community-contributed AI tools.

    Enables members to:
    1. Register their AI tools from the Project Showcase
    2. Make their tools available to the community
    3. Execute other members' tools safely
    4. Track usage and performance metrics
    """

    def __init__(self, db: Client):
        self.db = db
        self.http_client = httpx.AsyncClient(timeout=30.0)

    async def register_tool(
        self,
        registration: ToolRegistration,
        creator_id: str,
    ) -> RegisteredTool:
        """
        Register a new community AI tool.

        Args:
            registration: Tool registration details
            creator_id: User ID of the tool creator

        Returns:
            RegisteredTool with metadata
        """
        # Verify project exists and belongs to creator
        project = (
            self.db.table("projects")
            .select("*")
            .eq("id", registration.project_id)
            .eq("creator_id", creator_id)
            .single()
            .execute()
        )

        if not project.data:
            raise ValueError("Project not found or you don't have permission")

        # Insert tool registration
        tool_data = {
            **registration.model_dump(),
            "creator_id": creator_id,
            "status": "pending_approval" if registration.requires_approval else "active",
            "total_executions": 0,
            "success_rate": 1.0,
            "average_execution_time_ms": 0.0,
        }

        result = self.db.table("community_tools").insert(tool_data).execute()

        return RegisteredTool(**result.data[0])

    async def execute_tool(
        self,
        request: CommunityToolRequest,
        user_id: str,
    ) -> CommunityToolResponse:
        """
        Execute a community AI tool.

        Args:
            request: Tool execution request
            user_id: User executing the tool

        Returns:
            CommunityToolResponse with results
        """
        start_time = time.time()

        try:
            # Fetch tool details
            tool = await self._get_tool(request.tool_id)

            if tool.status != "active":
                raise ValueError(f"Tool is not active. Status: {tool.status}")

            # Check rate limits
            await self._check_rate_limit(tool.id, user_id, tool.rate_limit)

            # Execute tool via HTTP request
            output_data = await self._call_tool_endpoint(
                endpoint=str(tool.api_endpoint),
                input_data=request.input_data,
                auth_method=tool.authentication_method,
            )

            execution_time = (time.time() - start_time) * 1000

            # Update metrics
            await self._update_tool_metrics(
                tool_id=tool.id,
                execution_time=execution_time,
                success=True,
            )

            # Log execution
            await self._log_tool_execution(
                tool_id=tool.id,
                user_id=user_id,
                input_data=request.input_data,
                output_data=output_data,
                execution_time=execution_time,
                success=True,
            )

            return CommunityToolResponse(
                tool_id=request.tool_id,
                success=True,
                output_data=output_data,
                execution_time_ms=execution_time,
            )

        except Exception as e:
            execution_time = (time.time() - start_time) * 1000

            # Update metrics for failure
            await self._update_tool_metrics(
                tool_id=request.tool_id,
                execution_time=execution_time,
                success=False,
            )

            return CommunityToolResponse(
                tool_id=request.tool_id,
                success=False,
                output_data={},
                execution_time_ms=execution_time,
                error_message=str(e),
            )

    async def list_tools(
        self,
        category: Optional[str] = None,
        status: str = "active",
        page: int = 1,
        per_page: int = 20,
    ) -> Dict[str, Any]:
        """
        List available community tools.

        Args:
            category: Filter by category
            status: Filter by status (default: active)
            page: Page number
            per_page: Results per page

        Returns:
            Dict with tools, total, page info
        """
        query = self.db.table("community_tools").select("*").eq("status", status)

        if category:
            query = query.eq("category", category)

        # Get total count
        count_result = query.execute()
        total = len(count_result.data)

        # Apply pagination
        offset = (page - 1) * per_page
        query = query.range(offset, offset + per_page - 1)

        result = query.execute()

        tools = [RegisteredTool(**tool) for tool in result.data]

        return {
            "tools": tools,
            "total": total,
            "page": page,
            "per_page": per_page,
        }

    async def _get_tool(self, tool_id: str) -> RegisteredTool:
        """Fetch tool details from database."""
        result = (
            self.db.table("community_tools")
            .select("*")
            .eq("id", tool_id)
            .single()
            .execute()
        )

        if not result.data:
            raise ValueError(f"Tool not found: {tool_id}")

        return RegisteredTool(**result.data)

    async def _check_rate_limit(
        self,
        tool_id: str,
        user_id: str,
        rate_limit: int,
    ) -> None:
        """
        Check if user has exceeded rate limit for this tool.

        Args:
            tool_id: Tool ID
            user_id: User ID
            rate_limit: Max requests per hour

        Raises:
            ValueError if rate limit exceeded
        """
        # Query executions in last hour
        result = (
            self.db.table("tool_executions")
            .select("id")
            .eq("tool_id", tool_id)
            .eq("user_id", user_id)
            .gte("executed_at", "now() - interval '1 hour'")
            .execute()
        )

        if len(result.data) >= rate_limit:
            raise ValueError(
                f"Rate limit exceeded. Max {rate_limit} requests per hour."
            )

    async def _call_tool_endpoint(
        self,
        endpoint: str,
        input_data: Dict[str, Any],
        auth_method: str,
    ) -> Dict[str, Any]:
        """
        Call the external tool endpoint.

        Args:
            endpoint: Tool API endpoint
            input_data: Input parameters
            auth_method: Authentication method

        Returns:
            Tool response data
        """
        headers = {"Content-Type": "application/json"}

        # TODO: Implement authentication based on auth_method
        # For now, simple POST request

        response = await self.http_client.post(
            endpoint,
            json=input_data,
            headers=headers,
        )

        response.raise_for_status()
        return response.json()

    async def _update_tool_metrics(
        self,
        tool_id: str,
        execution_time: float,
        success: bool,
    ) -> None:
        """Update tool performance metrics."""
        try:
            # Fetch current metrics
            tool = await self._get_tool(tool_id)

            # Calculate new metrics
            total_executions = tool.total_executions + 1
            successes = int(tool.success_rate * tool.total_executions)
            if success:
                successes += 1

            new_success_rate = successes / total_executions

            # Calculate new average execution time
            total_time = tool.average_execution_time_ms * tool.total_executions
            new_avg_time = (total_time + execution_time) / total_executions

            # Update in database
            self.db.table("community_tools").update(
                {
                    "total_executions": total_executions,
                    "success_rate": new_success_rate,
                    "average_execution_time_ms": new_avg_time,
                }
            ).eq("id", tool_id).execute()

        except Exception as e:
            print(f"Error updating tool metrics: {e}")

    async def _log_tool_execution(
        self,
        tool_id: str,
        user_id: str,
        input_data: Dict[str, Any],
        output_data: Dict[str, Any],
        execution_time: float,
        success: bool,
    ) -> None:
        """Log tool execution for analytics."""
        try:
            log_data = {
                "tool_id": tool_id,
                "user_id": user_id,
                "input_data": input_data,
                "output_data": output_data,
                "execution_time_ms": execution_time,
                "success": success,
            }

            self.db.table("tool_executions").insert(log_data).execute()

        except Exception as e:
            print(f"Error logging tool execution: {e}")

    async def close(self):
        """Clean up HTTP client."""
        await self.http_client.aclose()
