import { Text, Table, SimpleGrid, TextInput, Textarea, Button, Modal } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { isNotEmpty, useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

export const Help = () => {
  const { t } = useTranslation()
  const [requests, setRequests] = useState([
    {
      date: '2024-06-01',
      title: 'Проблема с заказом #42',
      status: t('helppage.table.defaultStatus'),
      response: t('helppage.table.defaultResponse'),
    },
  ])

  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    mode: 'controlled',
    initialValues: { title: '', description: '' },
    validate: {
      title: isNotEmpty(t('helppage.form.errors.title')),
      description: isNotEmpty(t('helppage.form.errors.textarea')),
    },
  })

  const handleSubmit = (values) => {
    setRequests([
      ...requests,
      {
        date: new Date().toISOString().split('T')[0],
        title: values.title,
        status: t('helppage.table.defaultStatus'),
        response: t('helppage.table.defaultResponse'),
      },
    ])
    open()
    form.reset()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('helppage.modal.title')}>
        <Text>{t('helppage.modal.text')}</Text>
      </Modal>

      <Text fw={750}>{t('helppage.title')}</Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SimpleGrid cols={2} mt="lg">
          <div>
            <TextInput
              label={t('helppage.form.title')}
              key={form.key('title')}
              {...form.getInputProps('title')}
            />
            <Textarea
              mt="lg"
              label={t('helppage.form.textarea')}
              autosize={true}
              minRows={6}
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
          </div>
        </SimpleGrid>

        <Button mt="md" type="submit" disabled={!form.isValid()}>
          {t('helppage.form.btn')}
        </Button>
      </form>

      <Text fw={750} mt="xl">{t('helppage.table.title')}</Text>
      <Table mt="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t('helppage.table.header.date')}</Table.Th>
            <Table.Th>{t('helppage.table.header.theme')}</Table.Th>
            <Table.Th>{t('helppage.table.header.status')}</Table.Th>
            <Table.Th>{t('helppage.table.header.response')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {requests.map((r, index) => (
            <Table.Tr key={r.date + r.title + index}>
              <Table.Td>{r.date}</Table.Td>
              <Table.Td>{r.title}</Table.Td>
              <Table.Td>{r.status}</Table.Td>
              <Table.Td>{r.response}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Text c="dimmed" mt="lg" fs="italic">
        <sup>*</sup>
        {t('helppage.table.description')}
      </Text>
    </>
  )
}
