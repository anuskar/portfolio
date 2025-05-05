'use client'

import { buttonVariants } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import Link from '../link'

import StacksCard from './stacks-card'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

const AboutMe = () => {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5
      }}
      className='relative mt-24 mb-12'
    >
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        About Me
      </motion.h2>
      <motion.div
        className='mt-12 flex flex-col items-center'
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        <p className="mb-4 text-center text-neutral-700 dark:text-neutral-300 w-full px-4 md:px-0">
          I'm a product-minded technologist with a deep love for planning, evident in everything from trip organizing to meticulous to-do lists. This organized mindset shapes my approach to product development, where I leverage experience across AI and frontend development. I've led significant projects at Morgan Stanley, including scaling generative AI platforms for 80,000+ employees and enhancing virtual assistants for nearly 9 million users, always focusing on iterative improvement and user-centric design.
        </p>
        <div className='my-8 flex items-center justify-center'>
          <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }), 'rounded-xl')}>
            More About Me
          </Link>
        </div>
        <div className='w-full md:w-2/3'>
          <StacksCard />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AboutMe
