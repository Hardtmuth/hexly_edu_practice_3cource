import { Container, SimpleGrid, Text, Table, Button, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import { OrderModal } from './OrderModal.jsx'
import { increment, decrement, removeItem, clearCart } from '../slices/cartSlice.js'

const PRIMARY_COL_HEIGHT = '300px'

export const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [opened, { open, close }] = useDisclosure(false)

  const { t } = useTranslation()

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  const rows = cart.map((item) => {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.price}</Table.Td>
        <Table.Td>
          <Button.Group>
            <Button variant="subtle" onClick={() => dispatch(decrement(item.id))} size="xs">
              -
            </Button>
            <Button.GroupSection variant="subtle" bg="var(--mantine-color-body)" size="xs">
              {item.count}
            </Button.GroupSection>
            <Button variant="subtle" onClick={() => dispatch(increment(item.id))} size="xs">
              +
            </Button>
            <Button variant="subtle" color="red" onClick={() => dispatch(removeItem(item.id))} size="xs">
              ×
            </Button>
          </Button.Group>
        </Table.Td>
        <Table.Td>{`${item.price * item.count}.00 р.`}</Table.Td>
      </Table.Tr>
    )
  },
  )

  const handleOpenModal = () => open()

  const totalPrice = cart.reduce((acc, item) => {
    acc += item.price * item.count
    return acc
  }, 0)

  return (
    <>
      <Modal opened={opened} onClose={close} title={t('cartpage.orderModal.header')}>
        <OrderModal />
      </Modal>

      <Container>
        <Group justify="space-between">
          <Text fw={750} my="lg">{t('cartpage.cart')}</Text>
          {cart.length > 0
            ? <Button onClick={() => dispatch(clearCart())}>{t('cartpage.clearCart')}</Button>
            : <></>}
        </Group>
        {cart.length > 0
          ? (
              <>
                <Table striped>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>{t('cartpage.table.dishName')}</Table.Th>
                      <Table.Th>{t('cartpage.table.price')}</Table.Th>
                      <Table.Th>{t('cartpage.table.quantity')}</Table.Th>
                      <Table.Th>{t('cartpage.table.cost')}</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Group justify="end" mt="md">
                  <Text fw={750}>{`${t('cartpage.totalPrice')} ${totalPrice} ${t('cartpage.currency')}`}</Text>
                  <Button onClick={() => handleOpenModal()}>{t('cartpage.order')}</Button>
                </Group>
              </>
            )
          : (
              <Text>{t('cartpage.empty')}</Text>
            )}
      </Container>
    </>
  )
}
