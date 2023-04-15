import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
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
