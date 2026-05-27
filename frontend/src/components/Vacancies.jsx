import { Title, Text, Image, Container, Grid, List } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const Vacancies = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <Title order={3}>{t('vacanciespage.title')}</Title>
      <Text mt="lg">{t('vacanciespage.text')}</Text>
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
          <List mt="lg">
            <List.Item>{t('vacanciespage.vacancies.vacance1')}</List.Item>
            <List.Item>{t('vacanciespage.vacancies.vacance2')}</List.Item>
            <List.Item>{t('vacanciespage.vacancies.vacance3')}</List.Item>
            <List.Item>{t('vacanciespage.vacancies.vacance4')}</List.Item>
          </List>
          <Text fw={750} mt="lg">
            {t('vacanciespage.offer.title')}
          </Text>
          <List>
            <List.Item>{t('vacanciespage.offer.item1')}</List.Item>
            <List.Item>{t('vacanciespage.offer.item2')}</List.Item>
            <List.Item>{t('vacanciespage.offer.item3')}</List.Item>
            <List.Item>{t('vacanciespage.offer.item4')}</List.Item>
            <List.Item>{t('vacanciespage.offer.item5')}</List.Item>
            <List.Item>{t('vacanciespage.offer.item6')}</List.Item>
          </List>
          <Text fw={750} mt="lg">
            {t('vacanciespage.phone')}
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
  )
}
