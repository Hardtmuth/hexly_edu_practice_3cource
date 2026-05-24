import fastify from 'fastify'
import jwt from 'jsonwebtoken'
import { getDishes,  findUserByEmail, verifyPassword, pool } from './queries.js'


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
          error: 'Пользователь не найден'
        })
      }

      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return reply.status(401).send({
          error: 'Неверный пароль'
        })
      }

      const token = jwt.sign(
        {
          userId: user.user_id,
          role: user.role,
          email: user.email
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      reply.send({
        token,
        user: {
          id: user.user_id,
          name: user.user_name,
          role: user.role,
          email: user.email,
          phone: user.phone
        }
      })
    } catch (error) {
      app.log.error(error)
      reply.status(500).send({ error: 'Внутренняя ошибка сервера' })
    }
  })

  return app
}

const port = 3000

server().listen({ port })
