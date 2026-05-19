import { Grid, Image, Text, Badge, Button, Box, Group, SimpleGrid, Table } from '@mantine/core'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { addToCart } from '../slices/cartSlice.js'

const CardModal = ({ cardData }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const basePath = new URL('../../assets/img', import.meta.url).href
  const imgPath = `${basePath}/${cardData.img}`

  const [buttonState, setButtonState] = useState({
    loading: false,
    added: false,
  })
  
  const addToCartHandle = (dish) => {
    setButtonState({ loading: true, added: false })
    dispatch(addToCart(dish))
    setTimeout(() => {
      setButtonState({ loading: false, added: true })
    }, 1000)
  }

  return (
    <>
      <Image
        src={imgPath}
        h={270}
        w={405}
        radius="md"
        alt={imgPath}
      />

      <Table mt='lg' variant="vertical" layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={100}>{t('dishCardModal.compound')}</Table.Th>
            <Table.Td>{cardData.description}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>{t('dishCardModal.weight')}</Table.Th>
            <Table.Td>{`${cardData.weight} ${t('dishCardModal.unit')}`}</Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>{t('dishCardModal.price')}</Table.Th>
            <Table.Td>{`${cardData.price} ${t('dishCardModal.currency')}`}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <Button 
        color="blue" 
        fullWidth mt="md" 
        radius="md" 
        onClick={() => addToCartHandle(cardData)}
        loading={buttonState.loading}
        loaderProps={{ type: 'dots' }}
      >
        {buttonState.added ? 'Добавлено' : 'Добавить в заказ'}
      </Button>
    </>
  )
}

export { CardModal }
