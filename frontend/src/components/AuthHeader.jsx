import { IconSearch } from '@tabler/icons-react'
import { Autocomplete, Burger, Divider, Drawer, Group, ScrollArea } from '@mantine/core'
import { MantineLogo } from '@mantinex/mantine-logo'
import classes from '../../assets/styles/AuthHeader.module.css'

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
]

export const AuthHeader = () => {
  const items = links.map(link => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={event => event.preventDefault()}
    >
      {link.label}
    </a>
  ))

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <MantineLogo size={28} />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  )
}
