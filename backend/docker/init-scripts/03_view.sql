CREATE VIEW breakfast_cards AS
SELECT DISTINCT
  d.dish_id AS id,
  d.dish_name AS name,
  d.price AS price,
  d.composition AS description
FROM dishes d
WHERE d.category_id = 1;
