import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCases } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().default(1),
  })

  const { page, q } = searchGymsQuerySchema.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCases()

  const { gyms } = await searchGymsUseCase.execute({
    page,
    query: q,
  })

  return reply.status(200).send({
    gyms,
  })
}
