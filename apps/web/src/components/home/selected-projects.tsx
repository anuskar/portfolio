'use client'

import { BlurImage, buttonVariants } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { allProjects, type Project } from 'content-collections'
import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import Link from '../link'
import ProjectCards from '../project-cards'

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

type CardProps = {
  project: Project
}

const AllProjects = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })
  const filteredProjects = allProjects.filter(
    (project) => project.locale === 'en'
  )

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
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
        Projects
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
        <p className="mb-8 text-center text-neutral-700 dark:text-neutral-300 w-full px-4 md:px-0">
          All of my projects in one place
        </p>
        <div className='w-full'>
          <ProjectCards projects={filteredProjects} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AllProjects
