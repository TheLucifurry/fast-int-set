import each from '../utils/each';
import { MAX_BITS } from '../consts';
import countBits from '../utils/countBits';
import { intersection, union, difference, symmetricDifference } from '../core';
import BaseSet from './baseSet';

export default class UintSet extends BaseSet implements IFastSetUint<UintSet> {
  static TAG = 'UintSet';

  P: number[];

  constructor(items: number[] = []) {
    super();
    this.P = [];
    each(items, this.add.bind(this))
  }

  get size(): number{
    let res = 0;
    each(this.P, (bits) => res += countBits(bits))
    return res
  }

  add(uint: number): void {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this.P[index] |= byte;
  }

  has(uint: number): boolean {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    return (this.P[index] & byte) !== 0;
  }

  delete(uint: number): void {
    const byte = 1 << ( uint % MAX_BITS );
    const index = Math.trunc(uint / MAX_BITS);
    this.P[index] &= 0xffff ^ byte;
  }

  clear(): void {
    this.P = [];
  }

  forEach(callback: (item: number) => void): void {
    const data = this.P, len = data.length;
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
    intersection(res.P, this.P, set.P);
    return res;
  }

  union(set: UintSet): UintSet {
    const res = new UintSet();
    union(res.P, this.P, set.P);
    return res;
  }

  difference(set: UintSet): UintSet {
    const res = new UintSet();
    difference(res.P, this.P, set.P);
    return res;
  }

  symmetricDifference(set: UintSet): UintSet {
    const res = new UintSet();
    symmetricDifference(res.P, this.P, set.P);
    return res;
  }
}
