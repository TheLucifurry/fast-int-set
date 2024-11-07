import type { BenchOptions } from 'vitest'
import { bench, describe } from 'vitest'
import { UintSet as FastIntSet } from '../dist/index.js'
import { createArrayWithSteppedIntegers } from './utils.js'

const colors = {
  black: '\x1B[30m',
  red: '\x1B[31m',
  green: '\x1B[32m',
  yellow: '\x1B[33m',
  blue: '\x1B[34m',
  magenta: '\x1B[35m',
  cyan: '\x1B[36m',
  white: '\x1B[37m',
  gray: '\x1B[90m',
}

export function tint(color: keyof typeof colors, text: string) {
  return `${colors[color]}${text}\x1B[0m`
}

const ITEM_RANGE = 100_000
const SET_SIZES = [
  100,
  1_000,
  100_000,
]

const options: BenchOptions = {
  time: 1_000,
  // iterations: 100, // Minimal iterations
}

const NATIVE_SET_TITLE = tint('gray', 'Native Set')
const LIB_SET_TITLE = tint('green', 'FastIntSet')

SET_SIZES
  .forEach((count) => {
    const items = createArrayWithSteppedIntegers(0, ITEM_RANGE, count)
    const suffix = ` (${count} items in the range up to ${ITEM_RANGE})`

    describe(`Create instance${suffix}`, () => {
      bench(NATIVE_SET_TITLE, () => {
        const set = new Set(items)
      }, options)

      bench(LIB_SET_TITLE, () => {
        const set = new FastIntSet(items)
      }, options)

      // bench('Experimental FastIntSet', () => {
      //   const set = new ExperimentalSet(items)
      // }, options)
    })

    describe(`Operations add/has/delete${suffix}`, () => {
      bench(NATIVE_SET_TITLE, () => {
        const set = new Set(items)
        items.forEach((i) => {
          set.add(i)
          set.has(i)
          set.delete(i)
        })
      }, options)

      bench(LIB_SET_TITLE, () => {
        const set = new FastIntSet(items)
        items.forEach((i) => {
          set.add(i)
          set.has(i)
          set.delete(i)
        })
      }, options)

      // bench('Experimental FastIntSet', () => {
      //   const set = new ExperimentalSet(items)
      //   items.forEach((i) => {
      //     set.add(i)
      //     set.has(i)
      //     set.delete(i)
      //   })
      // }, options)
    })

    describe(`Operation forEach${suffix}`, () => {
      bench(NATIVE_SET_TITLE, () => {
        const set = new Set(items)
        const res: number[] = []
        set.forEach(i => res.push(i))
      }, options)

      bench(LIB_SET_TITLE, () => {
        const set = new FastIntSet(items)
        const res: number[] = []
        set.forEach(i => res.push(i))
      }, options)

      // bench('Experimental FastIntSet', () => {
      //   const set = new ExperimentalSet(items)
      //   const res: number[] = []
      //   set.forEach(i => res.push(i))
      // }, options)
    })
  })
