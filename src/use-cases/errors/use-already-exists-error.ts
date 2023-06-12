export class UseAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
