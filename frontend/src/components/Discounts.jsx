import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const Discounts = () => {
  const discounts = []
  const { t } = useTranslation()
  return (
    <>
      <Text>{t('dicsountspage.title')}</Text>
      <SimpleGrid cols={2}>
        <div>
          {discounts.length === 0
            ? (
                <Text mt="lg" c="dimmed" fs="italic">{t('dicsountspage.empty')}</Text>
              )
            : (
                <></>
              )}
        </div>
      </SimpleGrid>
    </>
  )
}
