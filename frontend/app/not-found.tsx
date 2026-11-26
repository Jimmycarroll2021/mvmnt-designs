import type {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: {index: false, follow: false},
}

export default function NotFound() {
  return (
    <section className="intro split" id="not-found">
      <h1>
        This page has
        <br />
        moved on.
      </h1>
      <div>
        <p>The page you were looking for does not exist or is no longer available.</p>
        <p className="small-copy">
          Head back to the studio to see our work, packages and how to start a conversation.
        </p>
        <Link className="button" href="/">
          <span>+</span> Back to MVMNT Design
        </Link>{' '}
        <Link className="button" href="/web-design-canberra">
          <span>+</span> Web design Canberra
        </Link>{' '}
        <Link className="button" href="/medical-practice-website-design">
          <span>+</span> Practice websites
        </Link>{' '}
        <Link className="button" href="/pricing">
          <span>+</span> View packages
        </Link>{' '}
        <Link className="button" href="/work">
          <span>+</span> Selected work
        </Link>{' '}
        <Link className="button" href="/#contact">
          <span>+</span> Let’s talk
        </Link>
      </div>
    </section>
  )
}
