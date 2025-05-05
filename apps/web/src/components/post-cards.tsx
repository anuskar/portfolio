'use client'

import type { Post } from 'content-collections'

import { BlurImage } from '@tszhong0411/ui'

import { useFormattedDate } from '@/hooks/use-formatted-date'

import Link from './link'

type PostCardsProps = {
  posts: Post[]
}

type PostCardProps = Post

const PostCards = (props: PostCardsProps) => {
  const { posts } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}

const PostCard = (props: PostCardProps) => {
  const { slug, title, summary, date } = props
  const formattedDate = useFormattedDate(date)

  return (
    <Link href={`/blog/${slug}`} className='shadow-feature-card group rounded-xl px-2 py-4'>
      <BlurImage
        src={`/images/blog/${slug}/cover.png`}
        className='rounded-lg'
        width={1200}
        height={630}
        imageClassName='transition-transform group-hover:scale-105'
        alt={title}
      />
      <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
        {formattedDate}
      </div>
      <div className='flex flex-col px-2 py-4'>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-muted-foreground mt-2'>{summary}</p>
      </div>
    </Link>
  )
}

export default PostCards
