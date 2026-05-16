CREATE VIEW breakfast_cards AS
SELECT DISTINCT
  d.dish_id AS id,
  d.dish_name AS name,
  d.price AS price,
  d.composition AS description,
  i.url AS img
FROM dishes d
RIGHT JOIN dish_images i ON d.dish_id = i.dish_id
WHERE d.category_id = 1;
