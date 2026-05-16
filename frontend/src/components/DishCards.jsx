import { SimpleGrid, Card, Image, Text, Badge, Button, Group, Pagination, Center, Modal, Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDishes, dishesSelectors } from '../slices/dishesSlice.js'


const RenderCard = ({ cardData } ) => {
  return (
    <Box key={cardData.id}>
      <Card shadow="sm" padding="lg" radius="md" withBorder onClick={open}>
        <Card.Section>
          <Image
            src={'aasd'}
            height={120}
            alt={cardData.name}
          />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <Text fw={500}>{cardData.name}</Text>
          <Badge color="pink">{cardData.price}</Badge>
        </Group>
        <Group justify="space-between">

          <Text size="sm" c="dimmed">
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

  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch])

  return (
    <SimpleGrid cols={3} spacing="sm" mb="xl">
      {dishesList.map((cardData) => (
        <RenderCard
          key={cardData.id}
          cardData={cardData}
        />
      ))}
    </SimpleGrid>
  )
}

export { DishCards }