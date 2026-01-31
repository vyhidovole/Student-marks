// vitest.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['src/__tests__/**/*.test.js', 'src/**/*.test.js'], // где искать тесты
    environment: 'node', // если работаете с DOM (например, с элементами HTML)
    // environment: 'node', // если тесты чисто на JS/без DOM
    globals: true, // позволяет использовать `test`, `expect` без импорта
    coverage: {
      provider: 'v8', // или 'istanbul'
      reporter: ['text', 'html', 'clover']
    }
  }
})
