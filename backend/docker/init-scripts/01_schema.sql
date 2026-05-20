DROP TABLE IF EXISTS order_deliveries;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS delivery_methods;
DROP TABLE IF EXISTS dish_images;
DROP TABLE IF EXISTS dishes;
DROP TABLE IF EXISTS dishes_categories;

-- 1. Категории блюд
CREATE TABLE dishes_categories (
    category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) NOT NULL
);

-- 2. Блюда
CREATE TABLE dishes (
    dish_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dish_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT REFERENCES dishes_categories(category_id) ON DELETE SET NULL,
    weight INT,
    calories DECIMAL(10,2),
    protein DECIMAL(10,2),
    fat DECIMAL(10,2),
    carbs DECIMAL(10,2),
    composition VARCHAR(255)
);

-- 3. Изображения блюд
CREATE TABLE dish_images (
    image_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dish_id INT NOT NULL REFERENCES dishes(dish_id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL
);

-- 4. Пользователи
CREATE TABLE users (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

-- 5. Заказы
CREATE TABLE orders (
    order_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- new, paid, shipped, cancelled
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Содержимое заказов
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    dish_id INT NOT NULL REFERENCES dishes(dish_id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase NUMERIC(10, 2) NOT NULL
);

-- 7. Адреса пользователей
CREATE TABLE addresses (
    address_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    address_name VARCHAR(50) DEFAULT 'Главный',
    street VARCHAR(150) NOT NULL,
    building VARCHAR(20) NOT NULL,
    entrance VARCHAR(20),
    apartment VARCHAR(20),
    description VARCHAR(255),
    is_default BOOLEAN DEFAULT FALSE
);

-- 8. Способы доставки
CREATE TABLE delivery_methods (
    method_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    method_name VARCHAR(100) NOT NULL,
    base_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

-- 9. Информация о доставке конкретного заказа
CREATE TABLE order_deliveries (
    delivery_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id INT NOT NULL UNIQUE REFERENCES orders(order_id) ON DELETE CASCADE,
    method_id INT REFERENCES delivery_methods(method_id) ON DELETE SET NULL,
    delivery_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, shipped, in_transit, delivered, returned
    delivery_address TEXT NOT NULL,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE
);