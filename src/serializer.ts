import binToHex from './utils/binToHex';
import { SERIALIZED_STRING_PREFIX } from './consts';
import each from './utils/each';

interface ISerializer {
  toString: (fis: IStore, headless?: boolean) => string
  fromString(fastIntSetToFill: IFastSet, data: string): boolean
  fromString(fastIntSetToFill: IFastSet, data: string, headless: boolean, targetVersion: string): boolean
}

const version = '0'; // NOTE: Raise the version when you change the algorithm of the following function
function dataStringify(data: FastSetDataField, prefix = ''): string {
  let res = prefix;
  each(data, item => res += item ? binToHex(item) : '-')
  return res;
}

function dataParseV1(dataFieldToFill: FastSetDataField, serialized: string): void {
  const cells = serialized.match(/[\da-f]{8}|-/g) || [];
  let ix = 0;
  each(cells, cell => {
    dataFieldToFill[ix++] = cell === '-' ? 0 : parseInt(cell, 16);
  });
}
// NOTE: Don't remove old versions of algorithms if you add new
const dataParsersList: typeof dataParseV1[] = [
  dataParseV1,
];

const Serializer: ISerializer = {
  toString(fastIntegerSet, headless = false) {
    const hasNegative = !!fastIntegerSet.N;

    let dataPositive = dataStringify(fastIntegerSet.P);
    let dataNegative = hasNegative ? dataStringify(fastIntegerSet.N as FastSetDataField, '.') : '';
    const data = dataPositive + (hasNegative ? '.' + dataNegative : '');

    if(headless) return data;

    // @ts-ignore
    const classTag = fastIntegerSet.constructor.TAG || '';

    const meta = `${SERIALIZED_STRING_PREFIX}${classTag}`;

    return `${meta}:${version}:${data}`;
  },
  fromString(fastIntSetToFill, serialized, headless = false, targetVersion = '0') {
    // TODO: more safety class validating
    if(!fastIntSetToFill || typeof serialized !== 'string' || (!headless && !serialized.startsWith(SERIALIZED_STRING_PREFIX))) {
      return false;
    }

    let meta = '', version = targetVersion as string, data = '';
    let positive = '', negative = '';
    if (headless) {
      [positive, negative] = serialized.split('.');
    } else {
      [meta, version, data] = serialized.split(':');
      [positive, negative] = data.split('.');
    }

    const dataParse = dataParsersList[+version];
    dataParse(fastIntSetToFill.P, positive);
    if(negative && fastIntSetToFill.N){
      dataParse(fastIntSetToFill.N, negative);
    }
    return true;
  },
};

export default Serializer;
