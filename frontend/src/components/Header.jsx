import { useMemo } from 'react'
import { Anchor, Box, Burger, Container, Divider, Drawer, Group, ScrollArea, Modal, Tabs, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
import { useNavigate, Link, useLocation } from 'react-router'
import { IconBasket, IconCakeRoll } from '@tabler/icons-react'
import classes from '../../assets/styles/Header.module.css'

import { useTranslation } from 'react-i18next'

import { SignInForm } from './SignInForm.jsx'
import { SignUpForm } from './SignUpForm.jsx'

export const Header = () => {
  // const [active, setActive] = useState(0)
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { t } = useTranslation()

  const userLinks = [
    { link: '/addresses', label: t('mainpage.header.addresses') },
    {
      isModal: true,
      label: t('mainpage.header.signinout'),
      onClick: open,
    },
    { link: '/cart', label: t('mainpage.header.cart') },
  ]

  const mainLinks = useMemo(() => [
    { link: '/', label: t('mainpage.header.breakfast'), category: 'breakfast' },
    { link: '/', label: t('mainpage.header.lunch'), category: 'lunch' },
    { link: '/', label: t('mainpage.header.dinner'), category: 'dinner' },
    { link: '/', label: t('mainpage.header.drinks'), category: 'drinks' },
    { link: '/', label: t('mainpage.header.businesslunch'), category: 'businesslunch' },
    { link: '/', label: t('mainpage.header.menu'), category: 'menu' },
    { link: '/delivery', label: t('mainpage.header.delivery'), category: 'delivery' },
  ], [t])

  const currentPath = location.pathname
  const searchParams = new URLSearchParams(location.search)
  const currentCategory = searchParams.get('category')

  const computedActive = useMemo(() => {
    if (currentPath !== '/') {
      const directMatchIndex = mainLinks.findIndex(link => link.link === currentPath)
      if (directMatchIndex !== -1) {
        return directMatchIndex
      }
    }

    if (currentPath === '/' && currentCategory) {
      const categoryMatchIndex = mainLinks.findIndex(
        link => link.category === currentCategory,
      )
      if (categoryMatchIndex !== -1) {
        return categoryMatchIndex
      }
    }

    return -1
  }, [currentPath, currentCategory, mainLinks])

  const mainItems = mainLinks.map((item, index) => {
    if (item.link === '/delivery') {
      return (
        <Anchor
          key={item.label}
          className={classes.mainLink}
          data-active={index === computedActive || undefined}
          onClick={(event) => {
            event.preventDefault()
            // setActive(index)
            navigate(item.link)
          }}
        >
          {item.label}
        </Anchor>
      )
    }
    return (
      <Anchor
        key={item.label}
        className={classes.mainLink}
        data-active={index === computedActive || undefined}
        onClick={(event) => {
          event.preventDefault()
          // setActive(index)
          navigate(`/?category=${item.category}`)
        }}
      >
        {item.label}
      </Anchor>
    )
  })

  const secondaryItems = userLinks.map((item) => {
    if (item.isModal) {
      return (
        <Anchor
          key={item.label}
          className={classes.secondaryLink}
          onClick={(event) => {
            event.preventDefault()
            item.onClick()
          }}
        >
          {item.label}
        </Anchor>
      )
    }

    return (
      <Anchor
        key={item.label}
        renderRoot={props => <Link to={item.link} {...props} />}
        className={classes.secondaryLink}
      >
        {item.link !== '/cart' ? item.label : <IconBasket />}
      </Anchor>
    )
  })

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Tabs defaultValue="signin">
          <Tabs.List>
            <Tabs.Tab value="signin">
              {t('mainpage.signform.signin')}
            </Tabs.Tab>
            <Tabs.Tab value="signup">
              {t('mainpage.signform.signup')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="signin">
            <SignInForm />
          </Tabs.Panel>

          <Tabs.Panel value="signup">
            <SignUpForm />
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <header className={classes.header}>
        <Container className={classes.inner}>
          <Group
            onClick={() => navigate('/manager')}
            style={{ cursor: 'pointer' }}
          >
            <IconCakeRoll size={34} />
            <Text size="lg" fs="italic" c="blue">
              {t('mainpage.brand')}
            </Text>
          </Group>

          <Box className={classes.links} visibleFrom="sm">
            <Group justify="flex-end">{secondaryItems}</Group>
            <Group gap={0} justify="flex-end" className={classes.mainLinks}>
              {mainItems}
            </Group>
          </Box>
        </Container>
      </header>
    </>
  )
}
