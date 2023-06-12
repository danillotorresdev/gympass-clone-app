import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('Executou o setup')

    return {
      teardown() {
        console.log('Executou o teardown')
      },
    }
  },
}
