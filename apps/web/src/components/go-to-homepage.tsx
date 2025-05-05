'use client'

import { buttonVariants } from '@tszhong0411/ui'

import Link from './link'

const GoToHomepage = () => {
  return (
    <Link href='/' className={buttonVariants()}>
      Go to homepage
    </Link>
  )
}

export default GoToHomepage
