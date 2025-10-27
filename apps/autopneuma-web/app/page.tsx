import Link from 'next/link'
import { ArrowRight, Cross, Wind, Heart, Code2, Users, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Cross className="h-6 w-6 text-navy" />
              <Wind className="h-4 w-4 text-navy-light absolute -right-2 -top-1" />
            </div>
            <span className="font-serif text-xl font-bold text-navy">
              Auto Pneuma
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/faith"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Our Faith
            </Link>
            <Link
              href="/community"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Community
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-navy hover:bg-navy-dark">
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-beige/30 to-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full border bg-white px-4 py-2 text-sm">
              <span className="text-muted-foreground">
                Building ethical AI with biblical principles
              </span>
            </div>

            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
              The Same Spirit.{' '}
              <span className="text-navy">Many Gifts.</span>
            </h1>

            <p className="mb-8 text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              A Christian community for developers, engineers, and entrepreneurs
              building AI technology guided by the Holy Spirit and grounded in
              biblical truth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-navy hover:bg-navy-dark">
                  Join the Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/faith">
                <Button size="lg" variant="outline">
                  Our Statement of Faith
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground italic">
              "There are different kinds of gifts, but the same Spirit." — 1
              Corinthians 12:4
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Building AI for Kingdom Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Auto Pneuma brings together Christian technologists to discuss
              ethics, share projects, and build responsibly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10">
                <Users className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Community Discussions</h3>
              <p className="text-muted-foreground">
                Engage in meaningful conversations about faith, AI ethics, and
                technology with fellow Christian developers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10">
                <Code2 className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Project Showcase</h3>
              <p className="text-muted-foreground">
                Share and discover AI projects built by Christians for God's
                glory and human flourishing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10">
                <Heart className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Prayer & Support</h3>
              <p className="text-muted-foreground">
                Request prayer for your projects and spiritual journey as you
                build technology for the Kingdom.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10">
                <BookOpen className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Biblical Resources</h3>
              <p className="text-muted-foreground">
                Access articles, guides, and discussions on applying biblical
                principles to AI development.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10">
                <Cross className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Christ-Centered Ethics</h3>
              <p className="text-muted-foreground">
                Develop AI with biblical ethics centered on Imago Dei,
                stewardship, truth, and love.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy/10">
                <Wind className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Spirit-Led Innovation</h3>
              <p className="text-muted-foreground">
                Build technology with wisdom and discernment, guided by the Holy
                Spirit in all we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Us in Building the Future
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Whether you're a developer, data scientist, entrepreneur, or
              simply curious about the intersection of faith and AI, there's a
              place for you here.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-navy hover:bg-white/90"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/faith" className="hover:text-foreground">
                    Statement of Faith
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-foreground">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/prayer" className="hover:text-foreground">
                    Prayer
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/community/guidelines" className="hover:text-foreground">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/community/ethics" className="hover:text-foreground">
                    AI Ethics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:hello@autopneuma.com" className="hover:text-foreground">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Auto Pneuma. Built with the Same Spirit.
            </p>
            <p className="text-sm text-muted-foreground italic">
              "For the common good" — 1 Corinthians 12:7
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
