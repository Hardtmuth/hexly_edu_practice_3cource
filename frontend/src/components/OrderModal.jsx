import { Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const OrderModal = () => {
  const { t } = useTranslation()
  return (
    <Text>{t('cartpage.orderModal.text')}</Text>
  )
}
