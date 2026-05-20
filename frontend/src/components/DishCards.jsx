import { SimpleGrid, Card, Image, Text, Badge, Button, Group, Pagination, Center, Modal, Box, Title, Table, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { IconBasket } from '@tabler/icons-react'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router'

import { fetchDishes, dishesSelectors } from '../slices/dishesSlice.js'
import { addToCart } from '../slices/cartSlice.js'

import { CardModal } from './CardModal.jsx'

const RenderCard = ({ cardData, onOpenModal, categoryParam}) => {
  const dispatch = useDispatch()
  const basePath = new URL('../../assets/img', import.meta.url).href
  const imgPath = `${basePath}/${cardData.img}`

  const [buttonState, setButtonState] = useState({
    loading: false,
    added: false,
  })

  const newPrice = categoryParam === 'businesslunch'
    ? (cardData.price * 0.7).toFixed(2)
    : cardData.price

  const cardDataWithNewPrice = { ...cardData, price: newPrice }

  const addToCartHandle = (dish) => {
    setButtonState({ loading: true, added: false })
    dispatch(addToCart(dish))
    setTimeout(() => {
      setButtonState({ loading: false, added: true })
      setTimeout(() => {
        setButtonState({ loading: false, added: false })
      }, 1000)
    }, 1000)
  }

  return (
    <Box key={cardDataWithNewPrice.id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={imgPath}
            height={120}
            alt={cardData.name}
            onClick={() => onOpenModal(cardDataWithNewPrice)}
          />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <Text fw={500} truncate="end" lineClamp={3}>{cardDataWithNewPrice.name}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed" truncate="end" lineClamp={3}>
            {cardDataWithNewPrice.description}
          </Text>
        </Group>
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => addToCartHandle(cardDataWithNewPrice)}
          loading={buttonState.loading}
          loaderProps={{ type: 'dots' }}
        >
          {buttonState.added ? 'Добавлено' : `${cardDataWithNewPrice.price} р.`}
        </Button>
      </Card>
    </Box>
  )
}

const RenderTable = ({ cardData, onOpenModal, categoryParam }) => {
  const dispatch = useDispatch()

  const [buttonState, setButtonState] = useState({
    loading: false,
    added: false,
  })

  const addToCartHandle = (dish) => {
    setButtonState({ loading: true, added: false })
    dispatch(addToCart(dish))
    setTimeout(() => {
      setButtonState({ loading: false, added: true })
      setTimeout(() => {
        setButtonState({ loading: false, added: false })
      }, 1000)
    }, 1000)
  }

  return (
    <Table.Tr>
      <Table.Td
        w="75%"
        style={{ cursor: 'pointer' }}
        onClick={() => onOpenModal(cardData)}
      >
        {cardData.name}
      </Table.Td>
      <Table.Td>
        {cardData.weight}
        {' '}
        г.
      </Table.Td>
        {categoryParam === 'businesslunch'
          ? (
            <Table.Td>
              {(cardData.price * 0.7).toFixed(2)}
              {' '}
              р.
            </Table.Td>
          )
          : (
            <Table.Td>
              {cardData.price}
              {' '}
              р.
            </Table.Td>
          )
        }
      <Table.Td>
        <ActionIcon
          variant="default"
          onClick={() => addToCartHandle(cardData)}
          loading={buttonState.loading}
          loaderProps={{ type: 'dots' }}
        >
          <IconBasket size={18} stroke={1} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  )
}

const categoriesMap = {
  breakfast: [1],
  lunch: [2, 5, 6],
  dinner: [6, 7, 8],
  drinks: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  businesslunch: [2, 5, 8, 12]
}

const categoriesNames = {
  1: 'Завтрак',
  2: 'Салаты',
  3: 'Закуски',
  4: 'Фри',
  5: 'Супы',
  6: 'Гарниры',
  7: 'Паста',
  8: 'Горячее',
  9: 'Неаполитанская пицца',
  10: 'Освежающие напитки',
  11: 'Домашние лимонады',
  12: 'Морс',
  13: 'Холодные напитки',
  14: 'Милкшейки',
  15: 'Алкогольные напитки',
  16: 'Бутылочное пиво',
  17: 'Разливное пиво',
  18: 'Чай',
  19: 'Заварной в чайнике',
  20: 'Кофе',
}

const businesslunchDishesId = [8, 13, 39 ,28, 29, 30, 42, 43, 44, 62, 61]

const DishCards = (view = { view: 'card' }) => {
  // console.log('view is: ', view)
  const dispatch = useDispatch()
  // const dishes = useSelector(dishesSelectors.selectEntities)
  const dishesIds = useSelector(dishesSelectors.selectIds)
  const dishesEntities = useSelector(dishesSelectors.selectEntities)
  const dishesList = dishesIds.map(id => dishesEntities[id])
  // const cart = useSelector(state => state.cart)
  // console.log('cart is: ', cart)

  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  // console.log(category)

  const businessDishes = dishesList.filter(dish => businesslunchDishesId.includes(dish.id))

  const filteredDishes = (categoryParam && categoryParam !== 'menu')
    ? (categoryParam && categoryParam === 'businesslunch')
      ? businessDishes.filter((dish) => {
          return categoriesMap[categoryParam].includes(dish.category)
        })
      : dishesList.filter((dish) => {
      // console.log(dish.category, categoriesMap[category], categoriesMap[category].includes(dish.category))
        return categoriesMap[categoryParam].includes(dish.category)
      })
    : dishesList

  const dishesByCategory = filteredDishes.reduce((acc, dish) => {
    if (!Object.hasOwn(acc, dish.category)) {
      acc[dish.category] = []
    }
    acc[dish.category].push(dish)
    return acc
  }, {})

  // console.log('dishesByCategory is: ', dishesByCategory)

  const [opened, { open, close }] = useDisclosure(false)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch])

  const handleOpenModal = (cardData) => {
    setSelectedCard(cardData)
    open()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={selectedCard ? `${selectedCard.name}` : ''}>
        {selectedCard && <CardModal cardData={selectedCard} />}
      </Modal>

      {categoryParam === 'businesslunch'
        ? (
          <>
            <hr></hr>
            <Title order={4}>Сегодня у нас в бизнес меню:</Title>
            <Text c="dimmed" fs="italic"><sup>*</sup> Бизнес меню дествует по будням с 12:00 до 15:00. В этот период времени стоимость блюд по акации выгоднее на 30%. Вы можете выбрать одно блюдо из любой категории</Text>
          </>
        )
        : <></>
      }

      {Object.entries(dishesByCategory).map(([category, dishes]) => {
        return (
          <Box key={category}>
            <Title order={4} mt="lg">{categoriesNames[category]}</Title>
            <hr></hr>
            {view.view === 'card'
              ? (
                  <SimpleGrid cols={3} spacing="sm" mb="xl">
                    {dishes.map(cardData => (
                      <RenderCard
                        key={cardData.id}
                        cardData={cardData}
                        onOpenModal={handleOpenModal}
                        categoryParam={categoryParam}
                      />
                    ))}
                  </SimpleGrid>
                )
              : (
                  <Table striped highlightOnHover>
                    <Table.Tbody>
                      {dishes.map(cardData => (<RenderTable key={cardData.id} cardData={cardData} categoryParam={categoryParam} onOpenModal={handleOpenModal} />))}
                    </Table.Tbody>
                  </Table>
                )}
          </Box>
        )
      })}
      {/* {filteredDishes.map(cardData => (
          <RenderCard
            key={cardData.id}
            cardData={cardData}
            onOpenModal={handleOpenModal}
          />
        ))} */}
    </>

  )
}

export { DishCards }
