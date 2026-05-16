DROP TABLE IF EXISTS dishes_categories;
DROP TABLE IF EXISTS dishes;

CREATE TABLE dishes_categories (
    category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE dishes (
    dish_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dish_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT,
    weight INT,
    calories DECIMAL(10,2),
    protein DECIMAL(10,2),
    fat DECIMAL(10,2),
    carbs DECIMAL(10,2),
    composition VARCHAR(255)
);
