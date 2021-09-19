import each from '../utils/each';
import { ESign, MAX_BITS } from '../consts';
import countBits from '../utils/countBits';
import { intersection, union, difference, symmetricDifference } from '../core';
import BaseSet from './baseSet';

export default class UintSet extends BaseSet implements IFastSet, IFutureNativeSet<UintSet> {
  static TAG = 'UintSet';

  constructor(items: number[] = []) {
    super();
    each(items, this.add.bind(this))
  }

  get size(): number{
    let res = 0;
    each(this.D[ESign.POSITIVE], (bits) => res += countBits(bits))
    return res
  }

  add(uint: number): void {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this.D[ESign.POSITIVE][index] |= byte;
  }

  has(uint: number): boolean {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    return (this.D[ESign.POSITIVE][index] & byte) !== 0;
  }

  delete(uint: number): void {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this.D[ESign.POSITIVE][index] &= 0xffff ^ byte;
  }

  forEach(callback: (item: number) => void): void {
    const data = this.D[ESign.POSITIVE], len = data.length;
    let cellIndex = -1, item = 0;
    while (++cellIndex < len) {
      if (!data[cellIndex]) {
        item += MAX_BITS;
      } else {
        let i = -1;
        while (++i < MAX_BITS) {
          if(data[cellIndex] & (1 << i)) {
            callback(item);
          }
          item++;
        }
      }
    }
  }

  intersection(set: UintSet): UintSet {
    const res = new UintSet();
    intersection(res.D[ESign.POSITIVE], this.D[ESign.POSITIVE], set.D[ESign.POSITIVE]);
    return res;
  }

  union(set: UintSet): UintSet {
    const res = new UintSet();
    union(res.D[ESign.POSITIVE], this.D[ESign.POSITIVE], set.D[ESign.POSITIVE]);
    return res;
  }

  difference(set: UintSet): UintSet {
    const res = new UintSet();
    difference(res.D[ESign.POSITIVE], this.D[ESign.POSITIVE], set.D[ESign.POSITIVE]);
    return res;
  }

  symmetricDifference(set: UintSet): UintSet {
    const res = new UintSet();
    symmetricDifference(res.D[ESign.POSITIVE], this.D[ESign.POSITIVE], set.D[ESign.POSITIVE]);
    return res;
  }
}
