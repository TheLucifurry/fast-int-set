import { MAX_ARRAY_LENGTH, MAX_BITS } from '../consts';

import { DataField } from '../types/global';
import { IStore } from '../types/interfaces';

export abstract class BaseSet implements IStore {
  static MAX_INTEGER = MAX_ARRAY_LENGTH * MAX_BITS;

  _: [DataField, DataField] = [[], []]

  abstract forEach(callback: (item: number) => void): void

  clear(): void {
    this._ = [[], []];
  }

  values(): number[] {
    const res: number[] = [];
    let ix = 0;
    this.forEach((item) => res[ix++] = item);
    return res;
  }
}
