'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Loader2, X } from 'lucide-react'
import { useScripture } from '@/lib/api/hooks'
import { ScriptureContextResponse } from '@/lib/api/client'

interface ScriptureAssistantButtonProps {
  query: string
  context?: string
  contentType?: 'discussion' | 'prayer_request' | 'project' | 'general'
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function ScriptureAssistantButton({
  query,
  context,
  contentType = 'general',
  variant = 'outline',
  size = 'sm',
}: ScriptureAssistantButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scriptureContext, setScriptureContext] =
    useState<ScriptureContextResponse | null>(null)
  const { getContext, isLoading, error } = useScripture()

  const handleClick = async () => {
    if (scriptureContext) {
      setIsOpen(!isOpen)
      return
    }

    const result = await getContext({
      query,
      context,
      content_type: contentType,
      bible_version: 'ESV',
    })

    if (result) {
      setScriptureContext(result)
      setIsOpen(true)
    }
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting Biblical Context...
          </>
        ) : (
          <>
            <BookOpen className="mr-2 h-4 w-4" />
            Scripture Context
          </>
        )}
      </Button>

      {error && (
        <div className="mt-2 rounded-md bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-800">
            Failed to load Scripture context: {error}
          </p>
        </div>
      )}

      {isOpen && scriptureContext && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-navy" />
                Scripture Context
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
              <div className="rounded-lg bg-beige/20 p-4 border border-beige">
                <h3 className="font-semibold mb-2 text-navy">Summary</h3>
                <p className="text-sm">{scriptureContext.summary}</p>
              </div>

              {/* Biblical Principles */}
              {scriptureContext.biblical_principles.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Biblical Principles</h3>
                  <ul className="space-y-2">
                    {scriptureContext.biblical_principles.map((principle, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-navy font-bold mt-0.5">•</span>
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scripture References */}
              {scriptureContext.scripture_references.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Scripture References</h3>
                  <div className="space-y-4">
                    {scriptureContext.scripture_references.map((ref, i) => (
                      <div
                        key={i}
                        className="rounded-lg border bg-card p-4"
                      >
                        <div className="font-semibold text-navy mb-2">
                          {ref.book} {ref.chapter}:{ref.verse_start}
                          {ref.verse_end && ref.verse_end !== ref.verse_start
                            ? `-${ref.verse_end}`
                            : ''}{' '}
                          ({ref.version})
                        </div>
                        <p className="text-sm italic leading-relaxed">
                          "{ref.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Theological Insights */}
              {scriptureContext.theological_insights && (
                <div>
                  <h3 className="font-semibold mb-3">Theological Insights</h3>
                  <div className="prose prose-sm max-w-none">
                    {scriptureContext.theological_insights
                      .split('\n\n')
                      .map((paragraph, i) => (
                        <p key={i} className="mb-3">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              )}

              {/* Practical Application */}
              {scriptureContext.practical_application && (
                <div>
                  <h3 className="font-semibold mb-3">Practical Application</h3>
                  <div className="prose prose-sm max-w-none">
                    {scriptureContext.practical_application
                      .split('\n\n')
                      .map((paragraph, i) => (
                        <p key={i} className="mb-3">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>
              )}

              {/* Further Study */}
              {scriptureContext.further_study.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">For Further Study</h3>
                  <div className="flex flex-wrap gap-2">
                    {scriptureContext.further_study.map((ref, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-navy/5 text-sm text-navy"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Scripture context provided by AI assistant. Grounded in
                  Bible-based Christian doctrine. Always test insights against
                  Scripture.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
