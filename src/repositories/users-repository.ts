import { Prisma, User } from '@prisma/client'

// Repositories são responsáveis por abstrair o acesso aos dados. Eles devem conter apenas a lógica necessária para acessar os dados.
export interface UsersRepository {
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  create: (data: Prisma.UserCreateInput) => Promise<User>
}
