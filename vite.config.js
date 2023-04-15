import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FastIntSet',
      fileName: 'fast-int-set',
      formats: ['es', 'umd'],
    },
    minify: 'terser'
  },
})
