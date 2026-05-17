import { Grid, Image, Text, Badge, Button, Box } from '@mantine/core'

const CardModal = ({ cardData }) => {
  // console.log(data)
  const basePath = new URL('../../assets/img', import.meta.url).href
  const imgPath = `${basePath}/${cardData.img}`
  return (
    <Box>
      <Grid>
        <Grid.Col span={7}>
          <Image
            src={imgPath}
            height={160}
            alt={imgPath}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Text fw={500}>
            Состав:
            {cardData.description}
          </Text>
          <Text fw={500}>
            Вес:
            {cardData.weight}
          </Text>
          <Badge color="pink">
            {cardData.price}
            {' '}
            р.
          </Badge>
        </Grid.Col>
      </Grid>
      <Button color="blue" fullWidth mt="md" radius="md">
        Добавить в заказ
      </Button>
    </Box>
  )
}

export { CardModal }