import { IFastSet, IFutureNativeSet } from '../../types/interfaces';
import {
  difference,
  intersection,
  symmetricDifference,
  union,
} from '../../core';

import { ESign, MAX_BITS } from '../../consts';
import { countBits } from '../../utils/countBits';
import { each } from '../../utils/each';
import { DataField } from '../../types/global';

export type IUintSet =
  & Omit<IFastSet, '_'>
  & Readonly<Pick<IFastSet, '_'>>
  & IFutureNativeSet<IUintSet>;

type FSD = [DataField, DataField]; // FastSet data

function add(_: FSD, uint: number): void {
  const byte = 1 << (uint % MAX_BITS);
  const index = Math.trunc(uint / MAX_BITS);
  _[ESign.POSITIVE][index] |= byte;
}

function forEach(_: FSD, callback: (item: number) => void): void {
  const data = _[ESign.POSITIVE];
  const len = data.length;
  let cellIndex = -1;
  let item = 0;
  while (++cellIndex < len) {
    if (!data[cellIndex]) {
      item += MAX_BITS;
    } else {
      let i = -1;
      while (++i < MAX_BITS) {
        if (data[cellIndex] & (1 << i)) {
          callback(item);
        }
        item++;
      }
    }
  }
}

function has(_: FSD, uint: number): boolean {
  const byte = 1 << (uint % MAX_BITS);
  const index = Math.trunc(uint / MAX_BITS);
  return (_[ESign.POSITIVE][index] & byte) !== 0;
}

function del(_: FSD, uint: number): void {
  const byte = 1 << (uint % MAX_BITS);
  const index = Math.trunc(uint / MAX_BITS);
  const d = _[ESign.POSITIVE];
  if ((d[index] & byte) !== 0) {
    d[index] ^= byte;
  }
}

function values(_: FSD): number[] {
  const res: number[] = [];
  let ix = 0;
  forEach(_, (item) => res[ix++] = item);
  return res;
}

// NOTE: FOR SOMEONE, WHO READING THIS:
// I don't see, that V1 or V2-unfinished (see commits) of FP-variant of the logic can beat the OOP (see main branch) variants in performance.
// You can try to finish this implementation

export function createUintSet(items: number[] = []): IUintSet {
  let _: [DataField, DataField] = [[], []];

  each(items, add.bind(0, _));

  // this.TAG = 'UintSet';
  return {
    _,
    add: add.bind(0, _),
    forEach: forEach.bind(0, _),
    has: has.bind(0, _),
    delete: del.bind(0, _),
    values: values.bind(0, _),
    clear(): void {
      _ = [[], []];
    },
    // TODO: ДОДеЛАТЬ
    get size(): number {
      let res = 0;
      each(_[ESign.POSITIVE], (bits) => res += countBits(bits));
      return res;
    },
    intersection(set: IUintSet): IUintSet {
      const res = createUintSet();
      intersection(res._[ESign.POSITIVE], _[ESign.POSITIVE], set._[ESign.POSITIVE]);
      return res;
    },
    union(set: IUintSet): IUintSet {
      const res = createUintSet();
      union(res._[ESign.POSITIVE], _[ESign.POSITIVE], set._[ESign.POSITIVE]);
      return res;
    },
    difference(set: IUintSet): IUintSet {
      const res = createUintSet();
      difference(res._[ESign.POSITIVE], _[ESign.POSITIVE], set._[ESign.POSITIVE]);
      return res;
    },
    symmetricDifference(set: IUintSet): IUintSet {
      const res = createUintSet();
      symmetricDifference(res._[ESign.POSITIVE], _[ESign.POSITIVE], set._[ESign.POSITIVE]);
      return res;
    },
  };
}
