import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/register'

// Aqui temos um exemplo de factory function. Uma factory function é uma função que retorna um objeto. Nesse caso, a função retorna uma
// instância de RegisterUseCase. O objetivo dessa função é abstrair a criação de uma instância de RegisterUseCase, para que não seja
// necessário instanciar RegisterUseCase diretamente no controlador. Isso é útil para que o controlador não precise saber como RegisterUseCase
// é criado, e também para que seja possível substituir RegisterUseCase por uma implementação diferente, sem que o controlador precise saber
// disso.
export function makeRegisterUseCases() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
