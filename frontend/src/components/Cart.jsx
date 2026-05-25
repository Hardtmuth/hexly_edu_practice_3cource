import { Container, SimpleGrid, Text, Table, Button, Group, Modal, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import { OrderModal } from './OrderModal.jsx'
import { increment, decrement, removeItem, clearCart } from '../slices/cartSlice.js'
import { toggleDelivery } from '../slices/deliverySlice.js'
import { IconEdit } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'


const PRIMARY_COL_HEIGHT = '300px'

export const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)

  const [openedChangeDelivery, { open: openChangeDelivery, close: closeChangeDelivery }] = useDisclosure(false)

  const isDelivery = useSelector(state => state.delivery.isDelivery)
  const address = useSelector(state => state.delivery.address)
  console.log('address is: ', address, isDelivery)

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
        <Table.Td>{`${(item.price * item.count).toFixed(2)} ${t('cartpage.currency')}`}</Table.Td>
      </Table.Tr>
    )
  },
  )

  const handleOpenModal = () => {
    dispatch(clearCart())
    open()
  }

  const totalPrice = cart.reduce((acc, item) => {
    acc += item.price * item.count
    return acc
  }, 0)


  return (
    <>
      <Modal opened={opened} onClose={close} title={t('cartpage.orderModal.header')}>
        <OrderModal />
      </Modal>

      <Modal opened={openedChangeDelivery} onClose={closeChangeDelivery} title='Изменить адрес или способ доставки'>
        <Group>
        <Button mt="md" onClick={() => {
          dispatch(toggleDelivery())
          closeChangeDelivery()
        }}>
          Самовывоз
        </Button>
        <Button mt="md" onClick={() => {
          dispatch(toggleDelivery())
          closeChangeDelivery()
          navigate('/delivery')
        }}>
          Ввести новый адрес
        </Button>
        </Group>
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
                  <Text>
                    {isDelivery
                      ? <Group>
                          <Text fw={750}>
                            {t('cartpage.deliveryTo')}
                          </Text>
                          <Text>{address}</Text>
                          <ActionIcon onClick={openChangeDelivery} size="xs" variant="outline" color='gray'>
                            <IconEdit stroke={1.5} size={12} />
                          </ActionIcon>
                        </Group>
                      : <></>
                    }
                  </Text>
                  <Text fw={750}>{`${t('cartpage.totalPrice')} ${(totalPrice).toFixed(2)} ${t('cartpage.currency')}`}</Text>
                  <Button
                    onClick={() => handleOpenModal()}
                    disabled={cart.length === 0 || (isDelivery && !address) || (isDelivery && totalPrice < 700) }
                  >
                    {t('cartpage.order')}
                  </Button>
                </Group>
                {isDelivery && totalPrice < 700
                    ? <><Text c="dimmed" size="sm" fs='italic' mt='lg'><sup>*</sup>{t('cartpage.deliveryCondition')}</Text></>
                    : <></>
                  }
              </>
            )
          : (
              <Text>{t('cartpage.empty')}</Text>
            )}
      </Container>
    </>
  )
}
