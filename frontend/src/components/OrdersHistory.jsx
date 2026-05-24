import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


export const OrdersHistory = () => {
  const user = useSelector((state) => state.auth.user)
  const orders = []
  const { t } = useTranslation()
  return (
    <>
      <Text>Ваша история заказов</Text>
      <SimpleGrid cols={2}>
        <div>
          {orders.length === 0
            ? (
              <Text mt='lg' c="dimmed" fs="italic">Ваша история заказов пуста</Text>
            )
            : (
              <></>
            )
          }
        </div>
      </SimpleGrid>
    </>
  )
}
