import { Group, Text, Avatar, Anchor, HoverCard } from '@mantine/core'
import { IconCakeRoll, IconLogout } from '@tabler/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from '../../assets/styles/AuthHeader.module.css'
import { useNavigate } from 'react-router'
import { logout } from '../slices/authSlice.js'

export const AuthHeader = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const userLetters = user.name.split(' ').map(w => w.at(0)).join('')
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <IconCakeRoll size={34} />
          <Text size="lg" fs="italic" c="blue">
            {t('mainpage.brand')}
          </Text>
        </Group>

        <Group>
          <a
            className={classes.link}
            onClick={() => navigate('/?category=menu')}
            style={{ cursor: 'pointer' }}
          >
            {t('userpage.header.menu')}
          </a>
          <Avatar color="blue" radius="xl">{userLetters}</Avatar>
          <Text>{user.name}</Text>
          <HoverCard shadow="md">
            <HoverCard.Target>
              <Anchor
                component="a"
                onClick={handleLogout}
              >
                <IconLogout size={28} style={{ transform: 'translateY(4px)' }} />
              </Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">{t('userpage.header.exit')}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </div>
    </header>
  )
}
