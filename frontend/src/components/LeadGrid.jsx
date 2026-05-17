import { Container, SimpleGrid, Text } from '@mantine/core'
import { DishCard } from './DishCard.jsx'
import { DishCards } from './DishCards.jsx'

import { useTranslation } from 'react-i18next'

const PRIMARY_COL_HEIGHT = '300px'

export function LeadGrid() {
  const { t } = useTranslation()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  return (
    <Container>
      <Text fw={700}>{t('mainpage.welcome')}</Text>
      <Text mb="lg" c="dimmed">{t('mainpage.text')}</Text>
        <DishCards />
    </Container>
  )
}
