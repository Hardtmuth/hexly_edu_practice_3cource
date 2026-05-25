import { Text, Table, SimpleGrid, TextInput, Textarea, Button, Modal } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { isNotEmpty, useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

export const Help = () => {
  const user = useSelector((state) => state.auth.user)
  const { t } = useTranslation()
  const [requests, setRequests] = useState([
    {
      date: '2024-06-01',
      title: 'Проблема с заказом #42',
      status: 'В обработке',
      response: 'Мы работаем над решением вашей проблемы',
    },
  ])

  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    mode: 'controlled',
    initialValues: { title: '', description: '' },
    validate: {
      title: isNotEmpty('Тема обращения не может быть пустой'),
      description: isNotEmpty('Опишите пожалуйста вашу проблему'),
    }
  })

  const handleSubmit = (values) => {
    setRequests([
      ...requests,
      {
        date: new Date().toISOString().split('T')[0],
        title: values.title,
        status: 'В обработке',
        response: 'Мы работаем над решением вашей проблемы',
      }
    ])
    open()
    form.reset()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={'Спасибо за обращение'}>
        <Text>Ваше обращение принято, в ближайшее время мы вернемся к вам с обратной связью</Text>
      </Modal>

      <Text fw={750}>Помощь</Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid cols={2} mt='lg'>
          <div>
            <TextInput
              label="Тема обращения"
              key={form.key('title')}
              {...form.getInputProps('title')}
            />
            <Textarea
              mt='lg'
              label="Описание проблемы"
              autosize={true}
              minRows={6}
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
          </div>
        </SimpleGrid>

        <Button mt="md" type="submit" disabled={!form.isValid()}>
          Отправить
        </Button>
      </form>

      <Text fw={750} mt='xl'>Мои обращения</Text>
      <Table mt='lg'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Дата</Table.Th>
            <Table.Th>Тема</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Ответ</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {requests.map((r, index) => (
            // ИСПРАВЛЕНО: добавлен index к key для гарантированной уникальности строк
            <Table.Tr key={r.date + r.title + index}>
              <Table.Td>{r.date}</Table.Td>
              <Table.Td>{r.title}</Table.Td>
              <Table.Td>{r.status}</Table.Td>
              <Table.Td>{r.response}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Text c="dimmed" mt='lg' fs='italic'>
        <sup>*</sup>Если у вас есть вопросы, пожалуйста, свяжитесь с нашей службой поддержки по телефону 8-800-000-00-00 или по электронной почте support@noctaliya.ru
      </Text>
    </>
  )
}
