import { Text, Table, SimpleGrid, ActionIcon, Button, Modal, Group, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { deleteAccount, updateUser } from '../slices/authSlice.js'


export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const user = useSelector((state) => state.auth.user)
  const { loading, error } = useSelector((state) => state.auth)
  const [ firstName, lastName ] = user.name.split(' ')

  const [opened, { open, close }] = useDisclosure(false)

  const [activeField, setActiveField] = useState({ column: '', label: '', initialValue: '' })
  const [newValue, setNewValue] = useState('')
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)

  useEffect(() => {
    setNewValue(activeField.initialValue)
  }, [activeField])

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount()).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Не удалось удалить аккаунт:', err)
    }
  }

  const handleOpenEdit = (column, label, initialValue) => {
    setActiveField({ column, label, initialValue })
    openEdit()
  }

  const handleSaveChanges = async () => {
    if (newValue.trim() === '' || newValue === activeField.initialValue) {
      closeEdit()
      return
    }

    try {
      await dispatch(updateUser({ column: activeField.column, value: newValue })).unwrap()
      closeEdit()
    } catch (err) {
      console.error('Не удалось обновить поле:', err)
    }
  }

  const Edit = (field) => {
  return (
    <ActionIcon
      variant="default"
      onClick={openEdit}
    >
      <IconPencilMinus size={18} stroke={1} />
    </ActionIcon>
  )
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

      <Modal 
        opened={openedEdit}
        onClose={closeEdit}
        title={`Редактирование: ${activeField.label}`}
      >
        <TextInput
          label={`Новое значение для ${activeField.label}`}
          value={newValue}
          onChange={(event) => setNewValue(event.currentTarget.value)}
          placeholder={activeField.initialValue}
        />
        {error && <Text color="red" size="sm" mt="xs">{error}</Text>}
        <Group justify='center' mt='lg'>
          <Button color="blue" onClick={handleSaveChanges} loading={loading}>Подтвердть</Button>
          <Button variant="default" onClick={closeEdit}>Отмена</Button>
        </Group>
      </Modal>

      <SimpleGrid cols={2}>
        <div>
          <Text>Ваши данные</Text>
        <Table variant="vertical" layout="fixed" withTableBorder mt='lg'>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th w='50%'>Имя пользователя</Table.Th>
              <Table.Td w='50%'>{user.name}</Table.Td>
              <Table.Td align="right" w='10%'>
                <ActionIcon variant="default" onClick={() => handleOpenEdit('user_name', 'Имя пользователя', user?.name)}>
                    <IconPencilMinus size={18} stroke={1} />
                  </ActionIcon>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Email</Table.Th>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td align="right">
                <ActionIcon variant="default" onClick={() => handleOpenEdit('email', 'Email', user?.email)}>
                    <IconPencilMinus size={18} stroke={1} />
                  </ActionIcon>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Th>Телефон</Table.Th>
              <Table.Td>{user.phone}</Table.Td>
              <Table.Td align="right">
                <ActionIcon variant="default" onClick={() => handleOpenEdit('phone', 'Телефон', user?.phone)}>
                    <IconPencilMinus size={18} stroke={1} />
                  </ActionIcon>
              </Table.Td>
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
