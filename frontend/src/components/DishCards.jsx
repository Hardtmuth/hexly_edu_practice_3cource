import { SimpleGrid, Card, Image, Text, Badge, Button, Group, Pagination, Center, Modal, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router'

import { fetchDishes, dishesSelectors } from '../slices/dishesSlice.js'
import { addToCart } from '../slices/cartSlice.js'

import { CardModal } from './CardModal.jsx'

const RenderCard = ({ cardData, onOpenModal }) => {
  const dispatch = useDispatch()
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
      setTimeout(() => {
        setButtonState({ loading: false, added: false })
      }, 1000)
    }, 1000)
  }

  return (
    <Box key={cardData.id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={imgPath}
            height={120}
            alt={cardData.name}
            onClick={() => onOpenModal(cardData)}
          />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <Text fw={500} truncate="end" lineClamp={3}>{cardData.name}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed" truncate="end" lineClamp={3}>
            {cardData.description}
          </Text>
        </Group>
        <Button
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => addToCartHandle(cardData)}
          loading={buttonState.loading}
          loaderProps={{ type: 'dots' }}
        >
          {buttonState.added ? 'Добавлено' : `${cardData.price} р.`}
        </Button>
      </Card>
    </Box>
  )
}

const categoriesMap = {
  'breakfast': [1],
  'lunch': [2, 5, 6],
  'dinner': [6, 7, 8],
  'drinks': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
}

const DishCards = () => {
  const dispatch = useDispatch()
  // const dishes = useSelector(dishesSelectors.selectEntities)
  const dishesIds = useSelector(dishesSelectors.selectIds)
  const dishesEntities = useSelector(dishesSelectors.selectEntities)
  const dishesList = dishesIds.map(id => dishesEntities[id])
  // const cart = useSelector(state => state.cart)
  // console.log('cart is: ', cart)

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  console.log(category)

  const filteredDishes = category
    ? dishesList.filter((dish) => {
      console.log(dish.category, categoriesMap[category], categoriesMap[category].includes(dish.category))
      return categoriesMap[category].includes(dish.category)
    })
    : dishesList

  console.log('filteredDishes is: ', filteredDishes)

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

      <SimpleGrid cols={3} spacing="sm" mb="xl">
        {filteredDishes.map(cardData => (
          <RenderCard
            key={cardData.id}
            cardData={cardData}
            onOpenModal={handleOpenModal}
          />
        ))}
      </SimpleGrid>
    </>

  )
}

export { DishCards }
