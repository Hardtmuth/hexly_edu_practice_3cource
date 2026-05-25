import { Text, Table, SimpleGrid, ActionIcon, Button, Modal, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { deleteAccount } from '../slices/authSlice.js'

const Edit = () => {
  return (
    <ActionIcon
      variant="default"
      onClick={() => console.log('edit')}
    >
      <IconPencilMinus size={18} stroke={1} />
    </ActionIcon>
  )
}

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const user = useSelector((state) => state.auth.user)
  const { loading, error } = useSelector((state) => state.auth)
  const [ firstName, lastName ] = user.name.split(' ')

  const [opened, { open, close }] = useDisclosure(false)

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount()).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Не удалось удалить аккаунт:', err)
    }
  }

  return (
    <>
      <Modal 
        opened={opened}
        onClose={close}
        title="Вы уверены что хотите удалить аккуант?"
      >
        <Text c='dimmed'>Все ваши заказы и данные будут удалены навсегда.</Text>
        <Group justify='center' mt='lg'>
          <Button color="red" onClick={handleDeleteAccount}>Да</Button>
          <Button onClick={close}>Нет</Button>
        </Group>
      </Modal>

      <SimpleGrid cols={2}>
        <div>
          <Text>Привет, {firstName}</Text>
        <Table variant="vertical" layout="fixed" withTableBorder mt='lg'>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w='30%'>Имя</Table.Th>
              <Table.Td w='60%'>{firstName}</Table.Td>
              <Table.Td align="right" w='10%'><Edit /></Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Фамилия</Table.Th>
              <Table.Td>{lastName}</Table.Td>
              <Table.Td align="right"><Edit /></Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Email</Table.Th>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td align="right"><Edit /></Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Телефон</Table.Th>
              <Table.Td>{user.phone}</Table.Td>
              <Table.Td align="right"><Edit /></Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Button 
          mt='lg'
          color="red"
          onClick={open}
        >
          Удалить аккаунт
        </Button>
        </div>
      </SimpleGrid> 
    </>
  )
}
