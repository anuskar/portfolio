import type { Metadata } from 'next'
import type { Blog, WithContext } from 'schema-dts'

import { allPosts } from 'content-collections'

import FilteredPosts from '@/components/filtered-posts'
import PageTitle from '@/components/page-title'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const generateMetadata = async (): Promise<Metadata> => {
    const title = "Blog"
    const description = "Articles about web development, programming, and technology."

    return {
        title,
        description,
        alternates: {
            canonical: `${SITE_URL}/blog`
        },
        openGraph: {
            url: `${SITE_URL}/blog`,
            title,
            description
        },
        twitter: {
            title,
            description
        }
    }
}

const Page = async () => {
    const title = "Blog"
    const description = "Articles about web development, programming, and technology."
    const url = `${SITE_URL}/blog`

    const posts = allPosts
        .toSorted((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

    const jsonLd: WithContext<Blog> = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': url,
        name: title,
        description,
        url,
        author: {
            '@type': 'Person',
            name: SITE_NAME,
            url: SITE_URL
        },
        blogPost: allPosts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `${url}/${post.slug}`,
            datePublished: post.date,
            dateModified: post.modifiedTime
        }))
    }

    return (
        <>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PageTitle title={title} description={description} />
            <FilteredPosts posts={posts} />
        </>
    )
}

export default Page 