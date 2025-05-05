'use client'

import { flags } from '@tszhong0411/env'
import { linkVariants } from '@tszhong0411/ui'
import { StarIcon } from 'lucide-react'

import { FOOTER_LINKS } from '@/config/links'

import Link from '../link'

const Footer = () => {
  return (
    <footer className='bg-background/30 shadow-xs relative mx-auto mb-6 flex w-full max-w-5xl flex-col rounded-2xl p-8 saturate-100 backdrop-blur-[10px]'>
      <div className='mt-12 flex justify-center'>
        <div className='flex flex-wrap items-center gap-8'>
          {FOOTER_LINKS.map((link) => {
            const { href, key } = link

            return (
              <Link key={href} href={href} className={linkVariants({ variant: 'muted' })}>
                {key === 'home' ? 'Home' :
                  key === 'projects' ? 'Projects' :
                    key === 'about' ? 'About' :
                      key}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
