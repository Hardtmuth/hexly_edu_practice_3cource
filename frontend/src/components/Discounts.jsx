import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


export const Discounts = () => {
  const user = useSelector((state) => state.auth.user)
  const discounts = []
  const { t } = useTranslation()
  return (
    <>
      <Text>Ваши скидки</Text>
      <SimpleGrid cols={2}>
        <div>
          {discounts.length === 0
            ? (
              <Text mt='lg' c="dimmed" fs="italic">У вас пока нет скидок</Text>
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
