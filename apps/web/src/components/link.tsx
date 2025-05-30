import NextLink from 'next/link'

type LinkProps = React.ComponentProps<'a'>

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props

  if (!href) {
    throw new Error('Link must have an href')
  }

  if (href.startsWith('http')) {
    return (
      <a target='_blank' rel='noopener noreferrer' href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  )
}

export default Link
