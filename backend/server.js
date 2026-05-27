import fastify from 'fastify'
import jwt from 'jsonwebtoken'
import { getDishes, findUserByEmail, verifyPassword, createUser, deleteUser, updateUser, pool } from './queries.js'

const apiPath = '/api/v1'
const getPath = keyword => [apiPath, keyword].join('/')

const server = () => {
  const app = fastify({
    logger: true,
  })

  app.register(import('@fastify/postgres'), {
    client: pool,
  })

  app.get('/', () => {
    return { hello: 'world' }
  })

  app.get(getPath('dishes'), async (request, reply) => {
    const res = await getDishes()
    reply.send(res)
  })

  app.post(getPath('auth/login'), async (request, reply) => {
    try {
      const { email, password } = request.body

      const user = await findUserByEmail(email)
      if (!user) {
        return reply.status(401).send({
          error: 'Пользователь не найден',
        })
      }

      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return reply.status(401).send({
          error: 'Неверный пароль',
        })
      }

      const token = jwt.sign(
        {
          userId: user.user_id,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: '24h' },
      )

      reply.send({
        token,
        user: {
          id: user.user_id,
          name: user.user_name,
          role: user.role,
          email: user.email,
          phone: user.phone,
        },
      })
    }
    catch (error) {
      app.log.error(error)
      reply.status(500).send({ error: 'Внутренняя ошибка сервера' })
    }
  })

  app.post(getPath('auth/register'), async (request, reply) => {
    try {
      const { username, email, password, phone } = request.body

      const existingUser = await findUserByEmail(email)
      if (existingUser) {
        return reply.status(400).send({
          error: 'Пользователь с таким email уже зарегистрирован',
        })
      }

      const newUser = await createUser(username, 'customer', email, password, phone)

      const token = jwt.sign(
        {
          userId: newUser.user_id,
          role: newUser.role,
          email: newUser.email,
        },
        process.env.JWT_SECRET || 'secret-key',
        { expiresIn: '24h' },
      )

      reply.status(211).send({
        token,
        user: {
          id: newUser.user_id,
          name: newUser.user_name,
          role: newUser.role,
          email: newUser.email,
          phone: newUser.phone,
        },
      })
    }
    catch (error) {
      app.log.error(error)
      reply.status(500).send({ error: 'Внутренняя ошибка сервера' })
    }
  })

  app.delete(getPath('auth/delete-account'), async (request, reply) => {
    try {
      const authHeader = request.headers.authorization
      if (!authHeader) {
        return reply.status(401).send({ error: 'Токен отсутствует' })
      }

      const token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key')

      const isDeleted = await deleteUser(decoded.userId)

      if (!isDeleted) {
        return reply.status(404).send({ error: 'Пользователь не найден' })
      }

      reply.send({ message: 'Аккаунт успешно удален' })
    }
    catch (error) {
      app.log.error(error)
      return reply.status(401).send({ error: 'Невалидный токен' })
    }
  })

  app.put(getPath('auth/update-account'), async (request, reply) => {
    try {
      const authHeader = request.headers.authorization
      if (!authHeader) {
        return reply.status(401).send({ error: 'Токен отсутствует' })
      }

      const token = authHeader.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key')

      const { column, value } = request.body

      if (!column || value === undefined) {
        return reply.status(400).send({ error: 'Необходимо указать column и value' })
      }

      if (column === 'email') {
        const existingUser = await findUserByEmail(value)
        if (existingUser && existingUser.user_id !== decoded.userId) {
          return reply.status(400).send({ error: 'Этот email уже занят другим пользователем' })
        }
      }

      const updatedUser = await updateUser(decoded.userId, column, value)

      if (!updatedUser) {
        return reply.status(404).send({ error: 'Пользователь не найден' })
      }

      reply.send({
        user: {
          id: updatedUser.user_id,
          name: updatedUser.user_name,
          role: updatedUser.role,
          email: updatedUser.email,
          phone: updatedUser.phone,
        },
      })
    }
    catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return reply.status(401).send({ error: 'Сессия устарела или токен невалиден' })
      }

      app.log.error(error)
      reply.status(500).send({ error: 'Внутренняя ошибка сервера' })
    }
  })

  return app
}

const port = 3000

server().listen({ port })
