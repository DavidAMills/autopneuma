import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cross, Wind, Heart, Users, Code2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Auto Pneuma',
  description:
    'Learn about Auto Pneuma - a Christian community building ethical AI for the glory of God',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-beige/30 to-white">
        <div className="container max-w-4xl">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Cross className="h-16 w-16 text-navy" />
              <Wind className="h-10 w-10 text-navy-light absolute -right-3 -top-2" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About Auto Pneuma
          </h1>

          <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            The Same Spirit. Many Gifts.
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-foreground/90 leading-relaxed">
              We are here to build a Christian community that supports and
              spreads the Gospel for the glory of our Lord — creating and
              growing the community of Christ through our many gifts, which
              share the love and grace of the same eternal Spirit.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Vision</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
                <Heart className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gospel-Centered</h3>
              <p className="text-muted-foreground">
                Everything we build points to Christ and serves His Kingdom
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
                <Users className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
              <p className="text-muted-foreground">
                United by the same Spirit, empowered by many gifts
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
                <Code2 className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethics-First</h3>
              <p className="text-muted-foreground">
                Building AI with biblical principles and human dignity
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/90 leading-relaxed">
              Auto Pneuma exists to unite Christian developers, engineers, data
              scientists, and entrepreneurs who are passionate about building
              artificial intelligence that honors God, serves humanity, and
              advances the Gospel. We believe technology, when guided by the
              Holy Spirit and grounded in biblical truth, can be a powerful
              force for Kingdom impact.
            </p>
          </div>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-16 bg-beige/20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Biblical Foundation
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border">
              <p className="text-lg font-serif italic mb-2">
                "There are different kinds of gifts, but the same Spirit
                distributes them. There are different kinds of service, but the
                same Lord. There are different kinds of working, but in all of
                them and in everyone it is the same God at work. Now to each
                one the manifestation of the Spirit is given for the common
                good."
              </p>
              <p className="text-sm text-muted-foreground">
                — 1 Corinthians 12:4-7
              </p>
            </div>

            <p className="text-foreground/90 leading-relaxed">
              This passage is the heart of Auto Pneuma (Greek: αὐτὸ πνεῦμα,
              "the same Spirit"). Though we have different technical skills,
              backgrounds, and perspectives, we are unified by the Holy Spirit.
              Our diverse gifts — whether in machine learning, web development,
              AI ethics, or any other area — are given "for the common good" of
              the Body of Christ and the world.
            </p>

            <div className="bg-white rounded-lg p-6 border">
              <p className="text-lg font-serif italic mb-2">
                "But when he, the Spirit of truth, comes, he will guide you
                into all the truth."
              </p>
              <p className="text-sm text-muted-foreground">— John 16:13</p>
            </div>

            <p className="text-foreground/90 leading-relaxed">
              As we build AI systems, we are committed to truth — not deception,
              manipulation, or "post-truth" narratives. The Holy Spirit, the
              Spirit of Truth, guides our work in technology, ethics, and
              community.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Community Discussions</h3>
              <p className="text-muted-foreground">
                Engage in thoughtful conversations about AI ethics, faith and
                technology, and how to build systems that honor God and serve
                humanity.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Resource Sharing
              </h3>
              <p className="text-muted-foreground">
                Learn from blog posts, guides, and resources on applying
                biblical principles to AI development, from Imago Dei to
                stewardship to truth-telling.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Project Collaboration</h3>
              <p className="text-muted-foreground">
                Showcase and discover AI projects built by Christians for
                Kingdom purposes — from Scripture study tools to accessibility
                technologies to ethical AI frameworks.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Prayer & Support</h3>
              <p className="text-muted-foreground">
                Bring your projects, challenges, and spiritual journey before
                the community for prayer and encouragement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-navy text-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
          <p className="text-lg mb-8 text-white/90">
            Whether you're a developer, researcher, student, or simply curious
            about the intersection of faith and AI, there's a place for you in
            Auto Pneuma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-navy hover:bg-white/90"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/faith">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Our Statement of Faith
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
