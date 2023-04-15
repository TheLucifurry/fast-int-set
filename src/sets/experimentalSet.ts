import { ESign, MAX_BITS } from '../consts'
import { difference, intersection, symmetricDifference, union } from '../core'
import type { IFastSet, IFutureNativeSet } from '../types/interfaces'
import { countBits } from '../utils/countBits'
import { each } from '../utils/each'
import { BaseSet } from './baseSet'
import { UintSet } from './uintSet'

export class ExperimentalSet extends BaseSet implements IFastSet, IFutureNativeSet<UintSet> {
  static TAG = ExperimentalSet.name
  _history: number[] = [] // TODO: Move to BaseSet

  constructor(items: number[] = []) {
    super()
    this._history = []
    each(items, this.add.bind(this))
  }

  add(uint: number): void {
    const byte = 1 << (uint % MAX_BITS)
    const index = Math.trunc(uint / MAX_BITS)
    this._[ESign.POSITIVE][index] |= byte
    this._history.push(uint)
  }

  forEach(callback: (item: number) => void): void {
    const items = [...new Set(this._history)]
    const len = items.length
    let i = -1
    while (++i < len) {
      const item = items[i]
      if (this.has(item))
        callback(item)
    }
    // TODO: Add removing unused items from list in next microtask
  }

  // Unchanged

  get size(): number {
    let res = 0
    each(this._[ESign.POSITIVE], bits => res += countBits(bits))
    return res
  }

  has(uint: number): boolean {
    const byte = 1 << (uint % MAX_BITS)
    const index = Math.trunc(uint / MAX_BITS)
    return (this._[ESign.POSITIVE][index] & byte) !== 0
  }

  delete(uint: number): void {
    const byte = 1 << (uint % MAX_BITS)
    const index = Math.trunc(uint / MAX_BITS)
    const data = this._[ESign.POSITIVE]
    if ((data[index] & byte) !== 0)
      data[index] ^= byte
  }

  intersection(set: UintSet): UintSet {
    const res = new UintSet()
    intersection(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    return res
  }

  union(set: UintSet): UintSet {
    const res = new UintSet()
    union(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    return res
  }

  difference(set: UintSet): UintSet {
    const res = new UintSet()
    difference(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    return res
  }

  symmetricDifference(set: UintSet): UintSet {
    const res = new UintSet()
    symmetricDifference(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    return res
  }
}
