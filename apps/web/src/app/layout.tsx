import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

import { cn } from '@tszhong0411/utils'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import Analytics from '@/components/analytics'
import Hello from '@/components/hello'
import Providers from '@/app/providers'
import { SITE_KEYWORDS, SITE_NAME, SITE_URL } from '@/lib/constants'

type LayoutProps = {
    children: React.ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: SITE_NAME,
            template: `%s | ${SITE_NAME}`
        },
        description: "Hong's personal website",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },
        manifest: '/favicon/site.webmanifest',
        twitter: {
            card: 'summary_large_image',
            title: SITE_NAME,
            description: "Hong's personal website",
            site: '@tszhong0411',
            siteId: '1152256803746377730',
            creator: '@tszhong0411',
            creatorId: '1152256803746377730',
            images: [
                {
                    url: '/images/og.png',
                    width: 1200,
                    height: 630,
                    alt: "Hong's personal website"
                }
            ]
        },
        keywords: SITE_KEYWORDS,
        creator: 'tszhong0411',
        openGraph: {
            url: SITE_URL,
            type: 'website',
            title: SITE_NAME,
            siteName: SITE_NAME,
            description: "Hong's personal website",
            locale: 'en',
            images: [
                {
                    url: '/images/og.png',
                    width: 1200,
                    height: 630,
                    alt: "Hong's personal website",
                    type: 'image/png'
                }
            ]
        },
        icons: {
            icon: '/favicon/favicon.svg',
            shortcut: '/favicon/favicon.svg',
            apple: [
                {
                    url: '/favicon/apple-touch-icon.png',
                    sizes: '180x180',
                    type: 'image/png'
                }
            ],
            other: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    url: '/favicon/favicon-16x16.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    url: '/favicon/favicon-32x32.png'
                }
            ]
        }
    }
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ]
}

const Layout = (props: LayoutProps) => {
    const { children } = props

    return (
        <html
            lang="en"
            className={cn(GeistSans.variable, GeistMono.variable)}
            suppressHydrationWarning
        >
            <body className='relative flex min-h-screen flex-col'>
                <NuqsAdapter>
                    <SpeedInsights />
                    <Providers>
                        {children}
                    </Providers>
                </NuqsAdapter>
            </body>
        </html>
    )
}

export default Layout 