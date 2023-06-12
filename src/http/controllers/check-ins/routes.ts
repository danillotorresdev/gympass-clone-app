import { validate } from '@/http/controllers/check-ins/validate'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { history } from '@/http/controllers/check-ins/history'
import { metrics } from '@/http/controllers/check-ins/metrics'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/check-ins/history', history)
  app.post('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
