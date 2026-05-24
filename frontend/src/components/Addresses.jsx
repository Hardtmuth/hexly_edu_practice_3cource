import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


export const Addresses = () => {
  const user = useSelector((state) => state.auth.user)
  const addresses = []
  const { t } = useTranslation()
  return (
    <>
      <Text>Ваши адреса</Text>
      <SimpleGrid cols={2}>
        <div>
          {addresses.length === 0
            ? (
              <Text mt='lg' c="dimmed" fs="italic">У вас пока  не добавлено ни одного адреса</Text>
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
