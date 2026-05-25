import { Text, Table, SimpleGrid, ActionIcon, Button } from '@mantine/core'
import { IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

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
  const user = useSelector((state) => state.auth.user)
  console.log(user)
  const [ firstName, lastName ] = user.name.split(' ')
  const { t } = useTranslation()
  return (
    <>
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
        <Button mt='lg' color="red">Удалить аккаунт</Button>
        </div>
      </SimpleGrid> 
    </>
  )
}
