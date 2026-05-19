CREATE VIEW dish_cards AS
SELECT DISTINCT
  d.dish_id AS id,
  d.category_id AS category,
  d.dish_name AS name,
  d.price AS price,
  d.weight AS weight,
  d.composition AS description,
  d.calories AS calories,
  d.protein AS protein,
  d.fat AS fat,
  d.carbs AS carbs,
  i.url AS img
FROM dishes d
RIGHT JOIN dish_images i ON d.dish_id = i.dish_id;
