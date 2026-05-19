import fastify from 'fastify'
import { getDishes } from './queries.js'

const apiPath = '/api/v1'
const getPath = keyword => [apiPath, keyword].join('/')

const server = () => {
  const app = fastify({
    logger: true,
  })

  app.get('/', () => {
    return { hello: 'world' }
  })

  app.get(getPath('dishes'), async (request, reply) => {
    const res = await getDishes()
    reply.send(res)
  })

  return app
}

const port = 3000

server().listen({ port })
