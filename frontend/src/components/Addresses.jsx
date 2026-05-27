import { Text, Table, SimpleGrid, ActionIcon } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const Addresses = () => {
  const addresses = []
  const { t } = useTranslation()
  return (
    <>
      <Text>{t('addressespage.title')}</Text>
      <SimpleGrid cols={2}>
        <div>
          {addresses.length === 0
            ? (
                <Text mt="lg" c="dimmed" fs="italic">{t('addressespage.empty')}</Text>
              )
            : (
                <></>
              )}
        </div>
      </SimpleGrid>
    </>
  )
}
