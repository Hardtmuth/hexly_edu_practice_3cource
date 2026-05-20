import { Container, Title, Text, Input, Textarea, Group, SimpleGrid, Checkbox, Anchor, Button } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'

export const Delivery = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { terms: false, rules: false },
    validate: {
      terms: isNotEmpty('Вы должны принять соглашение на обработку персональных данных'),
      rules: isNotEmpty('Вы должны ознакомиться и принять правила доставки'),
    },
  })
  return (
    <Container>
      <SimpleGrid cols={2}>
        <div>
          <Title order={3}>Введите адрес доставки</Title>
          <Text c="dimmed">На данный моменты мы осуществляем доставку только в городе Нижний Новгород</Text>
          <Input.Wrapper label="Улица" withAsterisk mt='lg'>
            <Input placeholder="ул. Рождественская" />
          </Input.Wrapper>
          <Group>
            <Input.Wrapper label="Дом" withAsterisk mt='lg'>
            <Input placeholder="122" type="number" w={140}/>
          </Input.Wrapper>
          <Input.Wrapper label="Подъезд" mt='lg'>
            <Input placeholder="1" type="number" w={140}/>
          </Input.Wrapper>
          <Input.Wrapper label="Квартира" mt='lg'>
            <Input placeholder="15" type="number" w={140}/>
          </Input.Wrapper>
          </Group>
      
          <Textarea mt='lg'
            label="Примечание"
            placeholder="Домофон не работает, позвоните я спущусь забрать заказ"
            autosize
            minRows={5}
          />
          <form onSubmit={form.onSubmit((values) => console.log(values))}> {/* FIX - Сделать всю форму контролируемой */}
            <Checkbox
              mt='lg'
              label={
                <>
                  Я согласен{' '}
                  <Anchor href="https://mantine.dev" target="_blank" inherit>
                    на обработку своих персональных данных
                  </Anchor>
                </>
              }
              key={form.key('terms')}
              {...form.getInputProps('terms', { type: 'checkbox' })}
            />
            <Checkbox
              mt='lg'
              label={
                <>
                  Я ознакомлен и согласен{' '}
                  <Anchor href="https://mantine.dev" target="_blank" inherit>
                    с правилами доставки
                  </Anchor>
                </>
              }
              key={form.key('rules')}
              {...form.getInputProps('rules', { type: 'checkbox' })}
            />

            <Button type="submit" mt="md">
              Оформить заказ на доставку
            </Button>
      </form>
      </div>
      
      </SimpleGrid>
    </Container>
  )
}
