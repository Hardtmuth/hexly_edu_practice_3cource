import { Container, SimpleGrid } from '@mantine/core'
import { DishCard } from './DishCard.jsx'
import { DishCards } from './DishCards.jsx'

const PRIMARY_COL_HEIGHT = '300px'

export function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  return (
    <Container>
      <h1>Main Page</h1>
      <p>Some Text</p>
        <DishCards />
    </Container>
  )
}
