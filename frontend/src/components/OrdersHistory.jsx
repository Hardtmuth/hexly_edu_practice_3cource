import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const OrdersHistory = () => {
  const orders = []
  const { t } = useTranslation()
  return (
    <>
      <Text>{t('orderhistory.title')}</Text>
      <SimpleGrid cols={2}>
        <div>
          {orders.length === 0
            ? (
                <Text mt="lg" c="dimmed" fs="italic">{t('orderhistory.empty')}</Text>
              )
            : (
                <></>
              )}
        </div>
      </SimpleGrid>
    </>
  )
}
