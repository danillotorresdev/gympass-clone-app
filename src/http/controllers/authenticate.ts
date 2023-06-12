import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCases } from '@/use-cases/factories/make-authenticate-use-case'

// controlers sao responsaveis por receber as requisicoes e enviar as respostas. eles nao devem conter logica de negocio.
// eles devem apenas orquestrar o fluxo de dados entre o cliente e o servidor.
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCases()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {}, // payload - aqui sao informacoes adicionais que podem ser enviadas no token
      {
        sign: {
          sub: user.id,
        },
      },
    )

    reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
