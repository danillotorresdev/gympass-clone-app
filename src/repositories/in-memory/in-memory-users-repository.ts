import { UsersRepository } from '@/repositories/users-repository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

// Aqui estamos criando um tipo de mock para o banco de dados, para que possamos testar o codigo sem precisar de um banco de dados real.
export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const users = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
    }

    this.items.push(users)

    return users
  }
}
