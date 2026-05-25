import { Pool } from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'
import bcrypt from 'bcrypt'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, './docker/.env') })

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
})

const getDishes = async () => {
  try {
    const res = await pool.query('SELECT * FROM dish_cards')
    console.log('Данные из представления dish_cards:', res.rows)
    return res.rows
  }
  catch (err) {
    console.error('❌ Ошибка получения даннх из представления dish_cards}:', err.stack)
  }
}

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
    return result.rows[0] || null
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error)
    throw error
  }
}

const verifyPassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword)
}

const createUser = async (userName, role, email, password, phone) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (user_name, role, email, password, phone) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING user_id, user_name, role, email, phone`,
    [userName, 'customer', email, hashedPassword, phone]
  )
  return result.rows[0]
}

const deleteUser = async (userId) => {
  const result = await pool.query(
    'DELETE FROM users WHERE user_id = $1 RETURNING user_id',
    [userId]
  )
  return result.rowCount > 0
}

const updateUser = async (userId, column, value) => {
  const allowedColumns = ['user_name', 'email', 'phone']
  if (!allowedColumns.includes(column)) {
    throw new Error(`Изменение колонки ${column} запрещено`)
  }

  const queryText = `
    UPDATE users 
    SET ${column} = $1 
    WHERE user_id = $2 
    RETURNING user_id, user_name, role, email, phone
  `

  const result = await pool.query(queryText, [value, userId])
  return result.rows[0]
}

export { getDishes, findUserByEmail, verifyPassword, createUser, deleteUser, updateUser, pool }
