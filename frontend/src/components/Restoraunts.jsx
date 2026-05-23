import { Container, Grid, Text, Image, Group, Button, Box } from '@mantine/core'
import { IconMapPin, IconPhone } from '@tabler/icons-react'
import { DishCards } from './DishCards.jsx'

import { useTranslation } from 'react-i18next'

const PRIMARY_COL_HEIGHT = '300px'

export const Restoraunts = () => {
  const { t } = useTranslation()
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  const addresses = [
    { address: t('restorauntspage.address1'), phone: t('restorauntspage.phone1') },
    { address: t('restorauntspage.address2'), phone: t('restorauntspage.phone2') },
    { address: t('restorauntspage.address3'), phone: t('restorauntspage.phone3') },
  ]

  return (
    <Container>
      <Text fw={700} my="lg">{t('restorauntspage.welcome')}</Text>
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
          <Text mb="lg" fw={750}>{t('restorauntspage.addresses')}</Text>
          {addresses.map((a, i) => {
            return (
              <Box key={i}>
                <Text>
                  <IconMapPin stroke={1} size={18} style={{ transform: 'translateY(2px)' }} />
                  {' '}
                  {a.address}
                </Text>
                <Text mb="lg">
                  <IconPhone stroke={1} size={18} style={{ transform: 'translateY(2px)' }} />
                  {' '}
                  {a.phone}
                </Text>
              </Box>
            )
          },
          )}

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
        <Button my="lg">
          {t('restorauntspage.btn')}
        </Button>
      </Group>
    </Container>
  )
}
