import { SimpleGrid, Card, Image, Text, Badge, Button, Group, Pagination, Center, Modal, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDishes, dishesSelectors } from '../slices/dishesSlice.js'

import { CardModal } from './CardModal.jsx'


const RenderCard = ({ cardData, onOpenModal } ) => {
  const basePath = new URL('../../assets/img', import.meta.url).href
  const imgPath = `${basePath}/${cardData.img}`
  // console.log(imgPath)
  return (
    <Box key={cardData.id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => onOpenModal(cardData)}>
        <Card.Section>
          <Image
            src={imgPath}
            height={120}
            alt={cardData.name}
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
        <Button color="blue" fullWidth mt="md" radius="md">
          {cardData.price}
          {' '}
          р.
        </Button>
      </Card>
    </Box>
  )
}

const DishCards = () => {
  const dispatch = useDispatch()
  const dishes = useSelector(dishesSelectors.selectEntities)
  const dishesIds = useSelector(dishesSelectors.selectIds)
  const dishesEntities = useSelector(dishesSelectors.selectEntities)
  const dishesList = dishesIds.map(id => dishesEntities[id])
  console.log('dishes is: ', dishes)

  const [opened, { open, close }] = useDisclosure(false)
  const [selectedCard, setSelectedCard] = useState(null);

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
        {dishesList.map((cardData) => (
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