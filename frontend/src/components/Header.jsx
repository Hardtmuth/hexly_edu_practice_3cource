import { useState } from 'react'
import { Anchor, Box, Burger, Container, Divider, Drawer, Group, ScrollArea, Modal, Tabs, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
import { useNavigate } from 'react-router'
import { IconBasket, IconCakeRoll } from '@tabler/icons-react';
import classes from '../../assets/styles/Header.module.css'

import { useTranslation } from 'react-i18next'

import { SignInForm } from './SignInForm.jsx'
import { SignUpForm } from './SignUpForm.jsx'

export const Header = () => {
  const [active, setActive] = useState(0)
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()

  const { t } = useTranslation()

  const userLinks = [
    { link: '#', label: t('mainpage.header.addresses') },
    { link: '#', label: t('mainpage.header.contacts') },
    { link: '#', label: t('mainpage.header.signinout') },
    { link: '#', label: t('mainpage.header.cart') },
  ]

  const mainLinks = [
    { link: '#', label: t('mainpage.header.businesslunch') },
    { link: '#', label: t('mainpage.header.breakfast') },
    { link: '#', label: t('mainpage.header.lunch') },
    { link: '#', label: t('mainpage.header.dinner') },
    { link: '#', label: t('mainpage.header.delivery') },
  ]

  const mainItems = mainLinks.map((item, index) => (
    <Anchor
      href={item.link}
      key={item.label}
      className={classes.mainLink}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault()
        setActive(index)
      }}
    >
      {item.label}
    </Anchor>
  ))

  const secondaryItems = userLinks.map(item => (
    <Anchor
      href={item.link}
      key={item.label}
      onClick={() => navigate('/cart')} // if no navigate reset store
      className={classes.secondaryLink}
    >
      {item.label !== 'Корзина' ? item.label : <IconBasket />}
    </Anchor>
  ))

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
