import each from '../utils/each';
import { MAX_ARRAY_LENGTH, MAX_BITS } from '../consts';
import countBits from '../utils/countBits';
import { min2, max2 } from '../utils/extremum';
export default class UintSet implements IFastSetUint<UintSet> {
  static MAX_UINT = MAX_ARRAY_LENGTH * MAX_BITS;
  static TAG = 'UintSet';

  P: number[];

  constructor(items: number[] = []) {
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

  values(): number[] {
    const res: number[] = [];
    let ix = 0;
    this.forEach(item => res[ix++] = item);
    return res;
  }

  intersection(set: UintSet): UintSet {
    const res = new UintSet();
    let i = min2(this.P.length, set.P.length);
    while (i--) {
      res.P[i] = this.P[i] & set.P[i];
    }
    return res;
  }

  union(set: UintSet): UintSet {
    const res = new UintSet();
    let i = max2(this.P.length, set.P.length);
    while (i--) {
      res.P[i] = this.P[i] | set.P[i];
    }
    return res;
  }

  difference(set: UintSet): UintSet {
    const res = new UintSet();
    let i = this.P.length;
    while (i--) {
      res.P[i] = this.P[i] & ~set.P[i];
    }
    return res;
  }

  symmetricDifference(set: UintSet): UintSet {
    const res = new UintSet();
    let i = max2(this.P.length, set.P.length);
    while (i--) {
      res.P[i] = this.P[i] ^ set.P[i];
    }
    return res;
  }
}
