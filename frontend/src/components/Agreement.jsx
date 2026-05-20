import { Title, Text, Image, Container } from '@mantine/core'

export const Agreement = () => {
  return (
    <Container>
      <Title order={3}>Согласие на обработку персональных данных</Title>
      <Text mt='lg'>
        Тут должен быть огромный текст согласия на обработку персональных данный и правил доставки сервиса, 
        но так как этот проэкт является учебным, я не храню и не обрабатываю ваши персональные данные
        поэтому держите картинку котика
      </Text>
      <Image
        mt='lg'
        radius="md"
        h={500}
        w="auto"
        fit="contain"
        src="https://i.pinimg.com/736x/38/5b/78/385b780dcbeca9f2555eba6adeaa7327.jpg"
      />
    </Container>
  )
}
