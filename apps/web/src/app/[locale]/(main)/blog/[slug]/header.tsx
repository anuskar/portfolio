'use client'

import { BlurImage } from '@tszhong0411/ui'

import ImageZoom from '@/components/image-zoom'
import Link from '@/components/link'
import { usePostContext } from '@/contexts/post'
import { useFormattedDate } from '@/hooks/use-formatted-date'

const Header = () => {
  const { date, title, slug } = usePostContext()
  const formattedDate = useFormattedDate(date)

  return (
    <div className='space-y-16 py-16'>
      <div className='space-y-16 sm:px-8'>
        <h1 className='bg-linear-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl md:leading-[64px] dark:from-white dark:via-white/90 dark:to-white/70'>
          {title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-2'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Written by</div>
            <Link href='https://github.com/tszhong0411' className='flex items-center gap-2'>
              <BlurImage
                src='/images/profile.png'
                className='rounded-full'
                width={48}
                height={48}
                alt='Hong'
              />
              Hong
            </Link>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Published on</div>
            <div>{formattedDate}</div>
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: `/images/blog/${slug}/cover.png`,
          alt: title
        }}
      >
        <BlurImage
          src={`/images/blog/${slug}/cover.png`}
          className='rounded-lg'
          width={1200}
          height={630}
          lazy={false}
          alt={title}
        />
      </ImageZoom>
    </div>
  )
}

export default Header
