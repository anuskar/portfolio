import {
  type IconType,
  SiGithub,
  SiLinkerd
} from '@icons-pack/react-simple-icons'
import {
  BarChartIcon,
  FlameIcon,
  MessageCircleIcon,
  PencilIcon,
  UserCircleIcon
} from 'lucide-react'

import {
  SITE_GITHUB_URL,
  SITE_LINKEDIN_URL
} from '@/lib/constants'

type SocialLinks = Array<{
  href: string
  title: string
  icon: IconType
}>

export const HEADER_LINKS = [
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    key: 'projects'
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    key: 'about'
  }
] as const

export const FOOTER_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: SITE_GITHUB_URL, key: 'Github' },
  { href: SITE_LINKEDIN_URL, key: 'LinkedIn' }
] as const

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: SiGithub
  },
  {
    href: SITE_LINKEDIN_URL,
    title: 'LinkedIn',
    icon: SiLinkerd
  },
]
