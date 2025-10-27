import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Statement of Faith | Auto Pneuma',
  description: 'Our Bible-based Christian beliefs and theological foundation',
}

export default function StatementOfFaithPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-b from-beige/30 to-white">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Statement of Faith
          </h1>
          <p className="text-xl text-muted-foreground">
            Our Bible-based Christian beliefs and theological foundation
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl prose prose-lg">
          <h2>Our Mission</h2>
          <p className="lead">
            We are here to build a Christian community that supports and spreads
            the Gospel for the glory of our Lord — creating and growing the
            community of Christ through our many gifts, which share the love and
            grace of the same eternal Spirit.
          </p>

          <blockquote>
            <p>
              "There are different kinds of gifts, but the same Spirit
              distributes them." — 1 Corinthians 12:4
            </p>
          </blockquote>

          <h2>Our Foundation</h2>
          <p>
            Auto Pneuma is built on Bible-based Christian faith as revealed in
            Scripture. We unite around essential Christian beliefs rooted in the
            unity of the Spirit while celebrating the diversity of gifts and
            perspectives within the Body of Christ.
          </p>

          <h2>Core Beliefs</h2>

          <h3>1. The Triune God</h3>
          <p>
            We believe in one God, eternally existing in three persons: Father,
            Son, and Holy Spirit. Each person of the Trinity is fully God,
            co-equal and co-eternal, yet there is only one God.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: Matthew 28:19; 2 Corinthians 13:14; John
            1:1-3, 14
          </p>

          <h3>2. The Authority of Scripture</h3>
          <p>
            We believe the Bible, consisting of the 66 books of the Old and New
            Testaments, is the inspired, infallible, and authoritative Word of
            God. It is our final authority for faith, life, and practice.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: 2 Timothy 3:16-17; 2 Peter 1:20-21;
            Psalm 119:105
          </p>

          <h3>3. Creation and the Image of God (Imago Dei)</h3>
          <p>
            We believe God created all things, visible and invisible, and that
            humanity is uniquely created in His image. This divine imprint gives
            inherent dignity, worth, and moral responsibility to every human
            being.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: Genesis 1:1, 26-27; Colossians 1:16;
            Psalm 139:13-14
          </p>
          <p className="text-sm">
            <strong>Implication for AI</strong>: Our work with artificial
            intelligence must always honor the unique nature of human beings as
            image-bearers of God, never seeking to replace or diminish human
            dignity.
          </p>

          <h3>4. The Person and Work of Jesus Christ</h3>
          <p>
            We believe in the deity of Jesus Christ, His virgin birth, His
            sinless life, His substitutionary death on the cross for our sins,
            His bodily resurrection, His ascension to the right hand of the
            Father, and His future return in glory.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: John 1:1, 14; Isaiah 7:14; 1 Peter 2:22;
            1 Corinthians 15:3-4; Acts 1:9-11; Revelation 19:11-16
          </p>

          <h3>5. Salvation by Grace Through Faith</h3>
          <p>
            We believe salvation is a gift of God's grace, received through
            faith in Jesus Christ alone. It is not earned by works but produces
            good works as fruit of genuine faith.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: Ephesians 2:8-9; John 3:16; Romans
            3:23-24; James 2:17
          </p>

          <h3>6. The Holy Spirit</h3>
          <p>
            We believe in the Holy Spirit, the third person of the Trinity, who
            convicts of sin, regenerates believers, indwells all who trust in
            Christ, and empowers them for life and service. The Spirit
            distributes spiritual gifts to believers for the building up of the
            Church.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: John 16:7-11; Titus 3:5; 1 Corinthians
            12:4-11; Galatians 5:22-23
          </p>
          <p className="text-sm">
            <strong>Foundation for Our Mission</strong>: The Holy Spirit is the
            "same Spirit" who unifies us and distributes "many gifts" — the very
            heart of Auto Pneuma's vision.
          </p>

          <h3>7. The Church</h3>
          <p>
            We believe the Church is the Body of Christ, composed of all true
            believers from every tribe, tongue, and nation. Local churches are
            gatherings of believers for worship, fellowship, teaching, and
            mission.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: 1 Corinthians 12:12-27; Ephesians
            4:11-16; Matthew 16:18; Acts 2:42-47
          </p>

          <h3>8. Unity in Christ</h3>
          <p>
            We affirm the essentials of Bible-based Christian faith while
            extending grace in secondary matters. We welcome all believers who
            follow Christ and affirm these core beliefs.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: Romans 14:1-13; Ephesians 4:3-6;
            Philippians 2:1-2
          </p>

          <h3>9. The Great Commission and Cultural Mandate</h3>
          <p>
            We believe Christians are called both to make disciples of all
            nations (the Great Commission) and to exercise stewardship over
            creation (the Cultural Mandate). Technology, when aligned with God's
            purposes, is a means of fulfilling both callings.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: Matthew 28:18-20; Genesis 1:28;
            Colossians 3:23-24
          </p>
          <p className="text-sm">
            <strong>Implication for Technology</strong>: Our work in AI and
            technology is an act of worship and stewardship, done for God's
            glory and humanity's flourishing.
          </p>

          <h3>10. Truth and the Spirit of Truth</h3>
          <p>
            We believe Jesus Christ is "the way, the truth, and the life" (John
            14:6), and that the Holy Spirit is the "Spirit of truth" who guides
            believers into all truth. In our technological work, we commit to
            pursuing truth with integrity, avoiding deception, and building
            systems that honor reality as God has created it.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Scripture</strong>: John 14:6; John 16:13; Proverbs 12:22;
            Ephesians 4:25
          </p>
          <p className="text-sm">
            <strong>Implication for AI</strong>: We reject the use of AI for
            deception, manipulation, or the distortion of truth. We commit to
            transparency, honesty, and ethical use of artificial intelligence.
          </p>

          <h2>Unity in the Body of Christ</h2>
          <p>
            We hold firmly to Bible-based Christian beliefs rooted in Scripture
            and welcome all believers who follow Christ and affirm these
            essentials.
          </p>
          <p>
            We agree to disagree charitably on secondary matters while
            maintaining unity in the Spirit and the truth of the Gospel. Our
            focus is Christ, His Gospel, and the work of the Holy Spirit in
            building His Church.
          </p>

          <h2>In Summary</h2>
          <p>We believe:</p>
          <ul>
            <li>
              <strong>One God</strong>: Father, Son, and Holy Spirit
            </li>
            <li>
              <strong>One Gospel</strong>: Salvation by grace through faith in
              Christ alone
            </li>
            <li>
              <strong>One Scripture</strong>: The Bible as God's authoritative
              Word
            </li>
            <li>
              <strong>One Church</strong>: The Body of Christ across all times
              and places
            </li>
            <li>
              <strong>One Mission</strong>: To glorify God and love our
              neighbors through all of life, including technology
            </li>
          </ul>

          <blockquote>
            <p>
              "Now to each one the manifestation of the Spirit is given for the
              common good." — 1 Corinthians 12:7
            </p>
          </blockquote>

          <blockquote>
            <p>
              "May the grace of the Lord Jesus Christ, and the love of God, and
              the fellowship of the Holy Spirit be with you all." — 2
              Corinthians 13:14
            </p>
          </blockquote>

          <div className="not-prose mt-12 flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg">
                Join the Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/community/guidelines">
              <Button size="lg" variant="outline">
                Community Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
