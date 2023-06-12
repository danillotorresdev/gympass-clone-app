import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCases } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCases()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
