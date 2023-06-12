import fastify from 'fastify'
import { appRoutes } from '@/http/routes'
import { ZodError } from 'zod'
import { env } from '@/env'

export const app = fastify()

app.register(appRoutes)
// ORM - Object Relational Mapping
// É uma forma de mapear os dados do banco de dados para objetos.

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Aqui poderia ser enviado um log para um serviço de monitoramento de erros como Datadog, Sentry, New Relic, etc.
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
