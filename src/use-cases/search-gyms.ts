import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

// SOLID: Single Responsibility Principle

// D - Dependency Inversion Principle - Eh uma tecnica para desacoplar codigo de dependencias externas (como o banco de dados).

// use cases sao responsaveis por orquestrar a logica de negocio da aplicacao.
export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
