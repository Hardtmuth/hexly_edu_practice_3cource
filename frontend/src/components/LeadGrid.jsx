import { Container, SimpleGrid, Text, ActionIcon, Group } from '@mantine/core'
import { IconListFilled, IconLayoutGrid } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DishCards } from './DishCards.jsx'

const PRIMARY_COL_HEIGHT = '300px'

export const LeadGrid = () => {
  const [view, setView] = useState('card')
  const { t } = useTranslation()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  const toggleView = () => {
    setView(prev => prev === 'card' ? 'table' : 'card')
  }

  return (
    <Container>
      <Group align="flex-start" justify="space-between">
        <Text fw={700}>{t('mainpage.welcome')}</Text>
        <ActionIcon variant="default" onClick={toggleView}>
          {view === 'card'
            ? <IconListFilled size={18} />
            : <IconLayoutGrid size={18} />}
        </ActionIcon>
      </Group>
      <Text mb="lg" c="dimmed">{t('mainpage.text')}</Text>
      <DishCards view={view} />
    </Container>
  )
}
