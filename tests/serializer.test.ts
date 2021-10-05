import { createArrayWithRandomInt, sort } from './utils';

import { Serializer } from '../src/serializer';
import { UintSet } from '../src';

const FIS = UintSet;

describe('Serializer', () => {
  it('Serialise to string: simple values', () => {
    const fs = new FIS([0, 1, 2, 3, 4, 5, 6, 7, 24, 25, 26, 27, 28, 29, 30, 31]);

    const data = Serializer.toString(fs);

    expect(data).toBe('@npm/fast-int-set/UintSet:0:ff0000ff');
  });

  it('Serialise to string', () => {
    const fs = new FIS([0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 24, 73, 145, 513]);

    const data = Serializer.toString(fs);

    expect(data).toBe('@npm/fast-int-set/UintSet:0:0101f07f-00000200-00020000-----------00000002');
  });

  it('Serialise to string: headless', () => {
    const fs = new FIS([0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 24, 73, 145, 513]);

    const data = Serializer.toString(fs, true);

    expect(data).toBe('0101f07f-00000200-00020000-----------00000002');
  });

  it('Serialise and deserialize without loses', () => {
    const fs = new FIS([0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 24, 73, 145, 513]);

    const data = Serializer.toString(fs);

    const retrievedFS = new FIS();
    Serializer.fromString(retrievedFS, data);

    expect(retrievedFS.values()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 24, 73, 145, 513]);
  });

  it('Serialise and deserialize without loses: headless', () => {
    const fs = new FIS([0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 24, 73, 145, 513, 14124]);

    const data = Serializer.toString(fs, true);

    const retrievedFS = new FIS();
    Serializer.fromString(retrievedFS, data, true, '0');

    expect(retrievedFS.values()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 24, 73, 145, 513, 14124]);
  });

  it.skip('Serialise and deserialize extra large numbers', () => {
    const items = [
      ...createArrayWithRandomInt(10, 0, FIS.MAX_INTEGER / 64),
      // FIS.MAX_UINT, // TODO: FIS.MAX_UINT is must be supported, research the trouble, and fix it if possible
    ];
    const itemsSorted = sort(items);
    const fs = new FIS(items);

    const data = Serializer.toString(fs, true);

    const retrievedFS = new FIS();
    Serializer.fromString(retrievedFS, data, true, '0');

    expect(retrievedFS.values()).toStrictEqual([...itemsSorted]);
  });
});
