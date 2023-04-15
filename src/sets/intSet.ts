import type { IFastSet, IFutureNativeSet } from '../types/interfaces'
import {
  difference,
  intersection,
  isDisjointsAB,
  isSubsetAofB,
  symmetricDifference,
  union,
} from '../core'

// import type { ESign } from '../consts';
import { ESign, MAX_ARRAY_LENGTH, MAX_BITS } from '../consts'
import { countBits } from '../utils/countBits'
import { each } from '../utils/each'
import { specialAbs } from '../utils/specialAbs'
import { BaseSet } from './baseSet'

export class IntSet extends BaseSet implements IFastSet, IFutureNativeSet<IntSet> {
  static MIN_INTEGER = -MAX_ARRAY_LENGTH * MAX_BITS - 1

  static TAG = IntSet.name

  constructor(items: number[] = []) {
    super()
    each(items, this.add.bind(this))
  }

  get size(): number {
    let res = 0
    const counter = (bits: number) => res += countBits(bits)
    each(this._[ESign.POSITIVE], counter)
    each(this._[ESign.NEGATIVE], counter)
    return res
  }

  add(int: number): void {
    const uint = specialAbs(int)
    const byte = 1 << (uint % MAX_BITS)
    const index = Math.trunc(uint / MAX_BITS)
    this._[int >= 0 ? ESign.POSITIVE : ESign.NEGATIVE][index] |= byte
  }

  has(int: number): boolean {
    const uint = specialAbs(int)
    const byte = 1 << (uint % MAX_BITS)
    const index = Math.trunc(uint / MAX_BITS)
    return (this._[int >= 0 ? ESign.POSITIVE : ESign.NEGATIVE][index] & byte) !== 0
  }

  delete(int: number): void {
    const uint = specialAbs(int)
    const byte = 1 << (uint % MAX_BITS)
    const index = Math.trunc(uint / MAX_BITS)
    const data = this._[int >= 0 ? ESign.POSITIVE : ESign.NEGATIVE]
    if ((data[index] & byte) !== 0)
      data[index] ^= byte
  }

  forEach(callback: (item: number) => void): void {
    const dataN = this._[ESign.NEGATIVE]
    let cellIndexN = dataN.length
    let itemN = -dataN.length * MAX_BITS
    while (cellIndexN--) {
      if (!dataN[cellIndexN]) {
        itemN += MAX_BITS
      }
      else {
        let i = MAX_BITS
        while (i--) {
          if (dataN[cellIndexN] & (1 << i))
            callback(itemN)

          itemN++
        }
      }
    }

    const data = this._[ESign.POSITIVE]
    const len = data.length
    let cellIndex = -1
    let item = 0
    while (++cellIndex < len) {
      if (!data[cellIndex]) {
        item += MAX_BITS
      }
      else {
        let i = -1
        while (++i < MAX_BITS) {
          if (data[cellIndex] & (1 << i))
            callback(item)

          item++
        }
      }
    }
  }

  intersection(set: IntSet): IntSet {
    const res = new IntSet()
    intersection(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    intersection(res._[ESign.NEGATIVE], this._[ESign.NEGATIVE], set._[ESign.NEGATIVE])
    return res
  }

  union(set: IntSet): IntSet {
    const res = new IntSet()
    union(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    union(res._[ESign.NEGATIVE], this._[ESign.NEGATIVE], set._[ESign.NEGATIVE])
    return res
  }

  difference(set: IntSet): IntSet {
    const res = new IntSet()
    difference(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    difference(res._[ESign.NEGATIVE], this._[ESign.NEGATIVE], set._[ESign.NEGATIVE])
    return res
  }

  symmetricDifference(set: IntSet): IntSet {
    const res = new IntSet()
    symmetricDifference(res._[ESign.POSITIVE], this._[ESign.POSITIVE], set._[ESign.POSITIVE])
    symmetricDifference(res._[ESign.NEGATIVE], this._[ESign.NEGATIVE], set._[ESign.NEGATIVE])
    return res
  }

  isSubsetOf(set: IntSet): boolean {
    return isSubsetAofB(this._[ESign.POSITIVE], set._[ESign.POSITIVE])
      && isSubsetAofB(this._[ESign.NEGATIVE], set._[ESign.NEGATIVE])
  }

  isSupersetOf(set: IntSet): boolean {
    return isSubsetAofB(set._[ESign.POSITIVE], this._[ESign.POSITIVE])
      && isSubsetAofB(set._[ESign.NEGATIVE], this._[ESign.NEGATIVE])
  }

  isDisjointFrom(set: IntSet): boolean {
    return isDisjointsAB(this._[ESign.POSITIVE], set._[ESign.POSITIVE])
      && isDisjointsAB(this._[ESign.NEGATIVE], set._[ESign.NEGATIVE])
  }
}
