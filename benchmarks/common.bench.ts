import type { BenchOptions } from 'vitest'
import { bench, describe } from 'vitest'
import { UintSet as FastIntSet } from '../dist/index.js'
import { createArrayWithSteppedIntegers } from './utils.js'

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

SET_SIZES
  .forEach((count) => {
    const items = createArrayWithSteppedIntegers(0, ITEM_RANGE, count)
    const suffix = ` (${count} items in the range up to ${ITEM_RANGE})`

    describe(`Create instance${suffix}`, () => {
      bench('Native Set', () => {
        const set = new Set(items)
      }, options)

      bench('FastIntSet', () => {
        const set = new FastIntSet(items)
      }, options)

      // bench('Experimental FastIntSet', () => {
      //   const set = new ExperimentalSet(items)
      // }, options)
    })

    describe(`Operations add/has/delete${suffix}`, () => {
      bench('Native Set', () => {
        const set = new Set(items)
        items.forEach((i) => {
          set.add(i)
          set.has(i)
          set.delete(i)
        })
      }, options)

      bench('FastIntSet', () => {
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
      bench('Native Set', () => {
        const set = new Set(items)
        const res: number[] = []
        set.forEach(i => res.push(i))
      }, options)

      bench('FastIntSet', () => {
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
