import { Group, Text, Avatar, Anchor, HoverCard } from '@mantine/core'
import { IconCakeRoll, IconLogout } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classes from '../../assets/styles/AuthHeader.module.css'
import { useNavigate } from 'react-router'

export const AuthHeader = () => {
  const user = useSelector((state) => state.auth.user)
  const userLetters = user.name.split(' ').map(w => w.at(0)).join('')
  const { t } = useTranslation()
  const navigate = useNavigate()

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
          <Avatar color="blue" radius="xl">{userLetters}</Avatar>
          <Text>{user.name}</Text>
          <HoverCard shadow="md">
            <HoverCard.Target>
              <Anchor
                component="a"
                onClick={(event) => {
                  event.preventDefault()
                  navigate('/')
                }}
              >
                <IconLogout size={28} style={{ transform: 'translateY(4px)' }}/>
              </Anchor>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">Выход</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </div>
    </header>
  )
}
