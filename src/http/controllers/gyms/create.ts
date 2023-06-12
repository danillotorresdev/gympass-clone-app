import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCases } from '@/use-cases/factories/make-create-gym-use-case'

// controlers sao responsaveis por receber as requisicoes e enviar as respostas. eles nao devem conter logica de negocio.
// eles devem apenas orquestrar o fluxo de dados entre o cliente e o servidor.
export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCases()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  reply.status(201).send()
}
