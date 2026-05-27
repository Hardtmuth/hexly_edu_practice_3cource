import { Text, Table, SimpleGrid, ActionIcon, Button, Modal, Group, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { deleteAccount, updateUser } from '../slices/authSlice.js'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const user = useSelector(state => state.auth.user)
  const { loading, error } = useSelector(state => state.auth)

  const [opened, { open, close }] = useDisclosure(false)

  const [activeField, setActiveField] = useState({ column: '', label: '', initialValue: '' })
  const [newValue, setNewValue] = useState('')
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount()).unwrap()
      navigate('/')
    }
    catch (err) {
      console.error('Не удалось удалить аккаунт:', err)
    }
  }

  const handleOpenEdit = (column, label, initialValue) => {
    setActiveField({ column, label, initialValue })
    setNewValue(initialValue || '')
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
    }
    catch (err) {
      console.error('Не удалось обновить поле:', err)
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={t('profile.removeModal.title')}
      >
        <Text c="dimmed">{t('profile.removeModal.text')}</Text>
        <Group justify="center" mt="lg">
          <Button color="red" onClick={handleDeleteAccount}>{t('profile.removeModal.accept')}</Button>
          <Button onClick={close}>{t('profile.removeModal.decline')}</Button>
        </Group>
      </Modal>

      <Modal
        opened={openedEdit}
        onClose={closeEdit}
        title={`${t('profile.editModal.title')} ${activeField.label}`}
      >
        <TextInput
          label={t('profile.editModal.input')}
          value={newValue}
          onChange={event => setNewValue(event.currentTarget.value)}
          placeholder={activeField.initialValue}
        />
        {error && <Text color="red" size="sm" mt="xs">{error}</Text>}
        <Group justify="center" mt="lg">
          <Button color="blue" onClick={handleSaveChanges} loading={loading}>{t('profile.editModal.accept')}</Button>
          <Button variant="default" onClick={closeEdit}>{t('profile.editModal.decline')}</Button>
        </Group>
      </Modal>

      <SimpleGrid cols={2}>
        <div>
          <Text>{t('profile.title')}</Text>
          <Table variant="vertical" layout="fixed" withTableBorder mt="lg">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w="50%">{t('profile.dataTable.name')}</Table.Th>
                <Table.Td w="50%">{user.name}</Table.Td>
                <Table.Td align="right" w="10%">
                  <ActionIcon variant="default" onClick={() => handleOpenEdit('user_name', `${t('profile.dataTable.name')}`, user?.name)}>
                    <IconPencilMinus size={18} stroke={1} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>{t('profile.dataTable.email')}</Table.Th>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td align="right">
                  <ActionIcon variant="default" onClick={() => handleOpenEdit('email', `${t('profile.dataTable.email')}`, user?.email)}>
                    <IconPencilMinus size={18} stroke={1} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Th>{t('profile.dataTable.phone')}</Table.Th>
                <Table.Td>{user.phone}</Table.Td>
                <Table.Td align="right">
                  <ActionIcon variant="default" onClick={() => handleOpenEdit('phone', `${t('profile.dataTable.phone')}`, user?.phone)}>
                    <IconPencilMinus size={18} stroke={1} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Button
            mt="lg"
            color="red"
            onClick={open}
          >
            {t('profile.removeBtn')}
          </Button>
        </div>
      </SimpleGrid>
    </>
  )
}
