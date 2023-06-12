import { UsersRepository } from '@/repositories/users-repository'
import { UseAlreadyExistsError } from '@/use-cases/errors/use-already-exists-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// SOLID: Single Responsibility Principle

// D - Dependency Inversion Principle - Eh uma tecnica para desacoplar codigo de dependencias externas (como o banco de dados).

// use cases sao responsaveis por orquestrar a logica de negocio da aplicacao.
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UseAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return { user }
  }
}
