import { Container, SimpleGrid, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'


const PRIMARY_COL_HEIGHT = '300px';

export const Cart = () => {
  const { t } = useTranslation();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  // Получаем IDs и entities отдельно
  const itemIds = useSelector(state => state.cart.ids);
  const entities = useSelector(state => state.cart.entities);

  // Собираем массив товаров
  const cartItems = itemIds.map(id => entities[id]).filter(Boolean);

  console.log('Cart items:', cartItems);
  console.log('IDs:', itemIds);
  console.log('Entities:', entities);

  return (
    <Container>
      <Text fw={750}>Корзина</Text>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <Text key={item.id}>
            {item.name} — {item.price} руб. (ID: {item.id})
          </Text>
        ))
      ) : (
        <Text>Корзина пуста</Text>
      )}
    </Container>
  );
};
