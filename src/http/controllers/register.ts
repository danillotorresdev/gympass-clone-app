import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UseAlreadyExistsError } from '@/use-cases/errors/use-already-exists-error'
import { makeRegisterUseCases } from '@/use-cases/factories/make-register-use-case'

// controlers sao responsaveis por receber as requisicoes e enviar as respostas. eles nao devem conter logica de negocio.
// eles devem apenas orquestrar o fluxo de dados entre o cliente e o servidor.
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCases()

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UseAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  reply.status(201).send()
}
