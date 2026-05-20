import { Title, Text, Image, Container, Grid, List } from "@mantine/core";

export const Vacancies = () => {
  return (
    <Container>
      <Title order={3}>Вакансии</Title>
      <Text mt="lg">К нам в команду требуются:</Text>
      <Grid>
        <Grid.Col span="auto">
          <Image
            mt="lg"
            radius="md"
            h={300}
            w="auto"
            fit="contain"
            src="https://i.pinimg.com/736x/35/05/52/350552b4acda9b96d96aa00d58820826.jpg"
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <List mt='lg'>
            <List.Item>Повара</List.Item>
            <List.Item>Официанты</List.Item>
            <List.Item>Управляющий</List.Item>
            <List.Item>Курьеры</List.Item>
          </List>
          <Text fw={750} mt='lg'>
            Наше предложение:
          </Text>
          <List>
            <List.Item>Опыт работы: не требуется (мы всему научим)</List.Item>
            <List.Item>Полная занятость</List.Item>
            <List.Item>График: 2/2</List.Item>
            <List.Item>Рабочие часы: 10, 11 или 12</List.Item>
            <List.Item>Формат работы: на месте работодателя</List.Item>
            <List.Item>Оформление: Трудовой договор</List.Item>
          </List>
          <Text fw={750} mt='lg'>
            Телефон для связи: +7 (831) 452-00-20
          </Text>
        </Grid.Col>
        <Grid.Col span="auto">
          <Image
            mt="lg"
            radius="md"
            h={300}
            w="auto"
            fit="contain"
            src="https://i1-e.pinimg.com/1200x/ca/97/52/ca9752c3189688194785f0789ba2976a.jpg"
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};
