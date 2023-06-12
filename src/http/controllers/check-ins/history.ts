import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckinsHistoryUseCases } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-cases'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckinsHistoryUseCases()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
