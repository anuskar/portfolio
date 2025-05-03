'use client'

import {
  SiCss3,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiMysql,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from '@icons-pack/react-simple-icons'
import { Marquee } from '@tszhong0411/ui'
import { BrainCircuit } from 'lucide-react'

const StacksCard = () => {
  const pmSkills = [
    'Agile',
    'Product Lifecycle Management',
    'Data Analysis',
    'A/B Testing',
    'Roadmap Prioritization',
    'Project Management'
  ]
  const interests = [
    'Gardening',
    'Crocheting',
    'Hosting Events',
    'Puzzles',
    'Painting',
    'Sudoku',
    'Nail Art',
    'Hiking'
  ]

  return (
    <div className='shadow-feature-card flex h-60 flex-col gap-2 overflow-hidden rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <BrainCircuit className='size-[18px]' />
        <h2 className='text-sm'>Skills & Interests</h2>
      </div>
      <Marquee gap='20px' className='py-4' fade pauseOnHover>
        {/* Technical Skills */}
        <SiHtml5 className='size-10' />
        <SiCss3 className='size-10' />
        <SiJavascript className='size-10' />
        <SiTypescript className='size-10' />
        <SiReact className='size-10' />
        <SiNextdotjs className='size-10' />
        <SiTailwindcss className='size-10' />
        <SiPython className='size-10' />
        <SiPostgresql className='size-10' />
        <SiMysql className='size-10' />
        <SiFigma className='size-10' />
        <SiJira className='size-10' />
        <SiOpenai className='size-10' />
      </Marquee>
      <Marquee gap='20px' className='py-4' reverse fade pauseOnHover>
        {/* PM Skills & Interests */}
        {[...pmSkills, ...interests].map((item) => (
          <div
            key={item}
            className='rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
          >
            {item}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default StacksCard
