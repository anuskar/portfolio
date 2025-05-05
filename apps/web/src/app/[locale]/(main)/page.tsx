import type { Metadata } from 'next'
import type { WebSite, WithContext } from 'schema-dts'

import AboutMe from '@/components/home/about-me'
import Hero from '@/components/home/hero'
import SelectedProjects from '@/components/home/selected-projects'
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    alternates: {
      canonical: SITE_URL
    }
  }
}

const Page = () => {
  const url = SITE_URL;

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: "Hong's personal website",
    url,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_GITHUB_URL, SITE_YOUTUBE_URL]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL
    },
    inLanguage: 'en',
    copyrightYear: new Date().getFullYear(),
    keywords: SITE_KEYWORDS,
    dateCreated: '2020-12-05',
    dateModified: new Date().toISOString()
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AboutMe />
      <SelectedProjects />
    </>
  )
}

export default Page
