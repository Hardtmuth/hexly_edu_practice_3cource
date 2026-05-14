import { useState } from 'react'
import { Anchor, Box, Burger, Container, Divider, Drawer, Group, ScrollArea, Modal, Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
import { useNavigate } from 'react-router'
import classes from '../../assets/styles/Header.module.css'

import { useTranslation } from 'react-i18next'

import { SignInForm } from './SignInForm.jsx'
import { SignUpForm } from './SignUpForm.jsx'

const mainLinks = [
  { link: '#', label: 'Бизнес Ланч' },
  { link: '#', label: 'Затрак' },
  { link: '#', label: 'Обед' },
  { link: '#', label: 'Ужин' },
  { link: '#', label: 'Доставка' },
]

export const Header = () => {
  const [active, setActive] = useState(0)
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()

  const { t } = useTranslation()

  const userLinks = [
    { link: '#', label: t('hello') },
    { link: '#', label: 'Контакты' },
    { link: '#', label: 'Вход / Регистрация' },
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
      onClick={open}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
  ))

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">

        <Tabs defaultValue="first">
          <Tabs.List>
            <Tabs.Tab value="first">
              First tab
            </Tabs.Tab>
            <Tabs.Tab value="second">
              Second tab
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first">
            <SignInForm />
          </Tabs.Panel>

          <Tabs.Panel value="second">
            <SignUpForm />
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <header className={classes.header}>
        <Container className={classes.inner}>
          <MantineLogo
            size={34}
            onClick={() => navigate('/manager')}
            style={{ cursor: 'pointer' }}
          />
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
