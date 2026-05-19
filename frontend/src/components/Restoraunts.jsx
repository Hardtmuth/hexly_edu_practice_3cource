import { Container, Grid, Text, Image, Group, Button } from '@mantine/core'
import { IconMapPin, IconPhone } from '@tabler/icons-react'
import { DishCards } from './DishCards.jsx'

import { useTranslation } from 'react-i18next'

const PRIMARY_COL_HEIGHT = '300px'

const addresses = [
  { address: 'ТРЦ "Фантастика", ул. Родионова, 187в', phone: 'тел.: +7 (831) 000-00-00'},
  { address: 'ТРК "Индиго Life", Казанское шоссе, 11', phone: 'тел.: +7 (831) 000-00-01'},
  { address: 'ТРЦ "Седьмое Небо", ул. Бетанкура, 1', phone: 'тел.: +7 (831) 000-00-99'},
]

export const Restoraunts = () => {
  const { t } = useTranslation()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  return (
    <Container>
      <Text fw={700} my='lg'>{t('restorauntspage.welcome')}</Text>
      <Text mb="lg" c="dimmed">{t('restorauntspage.text')}</Text>
      <Grid>
        <Grid.Col span="auto">
          <Image
            radius="md"
            h={300}
            w="auto"
            fit="contain"
            src="https://i.pinimg.com/736x/75/7d/98/757d98b38c1cd61244b3b5761cc50756.jpg"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Text mb='lg' fw={750}>{t('restorauntspage.addresses')}</Text>
          {addresses.map(a => (
            <>
              <Text><IconMapPin stroke={1} size={18} style={{ transform: 'translateY(2px)' }} />{' '}{a.address}</Text>
              <Text mb='lg'><IconPhone stroke={1} size={18} style={{ transform: 'translateY(2px)' }} />{' '}{a.phone}</Text>
            </>
          ))}
        </Grid.Col>
        <Grid.Col span="auto">
          <Image
            radius="md"
            h={295}
            w="auto"
            fit="contain"
            src="https://i1-e.pinimg.com/736x/09/c1/ef/09c1ef4d6d0be6f6e0430a230587e549.jpg"
          />
        </Grid.Col>
      </Grid>
      
      <Group justify="center" mt="md">
        <Button my='lg'>
          Забронировать стол
        </Button>
      </Group>
    </Container>
  )
}
