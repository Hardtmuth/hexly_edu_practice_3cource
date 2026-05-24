import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


export const Help = () => {
  const user = useSelector((state) => state.auth.user)
  const { t } = useTranslation()
  return (
    <>
      <Text>Помощь</Text>
      <SimpleGrid cols={2}>
        <div>
          Тут форма обратной связи, контакты и FAQ
        </div>
      </SimpleGrid>
    </>
  )
}
