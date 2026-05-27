import { Title, Text, Image, Container } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const Agreement = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Title order={3}>{t('agreementpage.title')}</Title>
      <Text mt="lg">
        {t('agreementpage.text')}
      </Text>
      <Image
        mt="lg"
        radius="md"
        h={500}
        w="auto"
        fit="contain"
        src="https://i.pinimg.com/736x/38/5b/78/385b780dcbeca9f2555eba6adeaa7327.jpg"
      />
    </Container>
  )
}
