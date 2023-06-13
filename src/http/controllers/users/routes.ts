import { refresh } from '@/http/controllers/users/refresh'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
