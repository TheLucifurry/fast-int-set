import type { DataField } from './types/global'
import type { IStore } from './types/interfaces'
import { ESign, SERIALIZED_STRING_PREFIX } from './consts'
import { binToHex } from './utils/binToHex'
import { each } from './utils/each'

interface ISerializer {
  toString: (fis: IStore, headless?: boolean) => string
  fromString(fastIntSetToFill: IStore, data: string): boolean
  fromString(fastIntSetToFill: IStore, data: string, headless: boolean, targetVersion: string): boolean
}

const version = '0' // NOTE: Raise the version when you change the algorithm of the following function
function dataStringify(data: DataField, prefix = ''): string {
  let res = prefix
  each(data, item => res += item ? binToHex(item) : '-')
  return res
}

function dataParseV1(DataFieldSegmentToFill: DataField, serialized: string): void {
  const cells = serialized.match(/[\da-f]{8}|-/g) || []
  let ix = 0
  each(cells, (cell) => {
    DataFieldSegmentToFill[ix++] = cell === '-' ? 0 : parseInt(cell, 16)
  })
}
// NOTE: Don't remove old versions of algorithms if you add new
const dataParsersList: typeof dataParseV1[] = [
  dataParseV1,
]

export const Serializer: ISerializer = {
  toString(fastIntegerSet, headless = false) {
    const hasNegative = !!fastIntegerSet._[ESign.NEGATIVE].length

    const dataPositive = dataStringify(fastIntegerSet._[ESign.POSITIVE])
    const dataNegative = hasNegative ? dataStringify(fastIntegerSet._[ESign.NEGATIVE] as DataField, '.') : ''
    const data = dataPositive + (hasNegative ? `.${dataNegative}` : '')

    if (headless)
      return data

    // @ts-expect-error Specific access to static prop
    const classTag = fastIntegerSet.constructor.TAG || ''

    const meta = `${SERIALIZED_STRING_PREFIX}${classTag}`

    return `${meta}:${version}:${data}`
  },
  fromString(fastIntSetToFill, serialized, headless = false, targetVersion = '0') {
    // TODO: more safety class validating
    if (!fastIntSetToFill || typeof serialized !== 'string' || (!headless && !serialized.startsWith(SERIALIZED_STRING_PREFIX)))
      return false

    let meta = ''
    let algVersion = targetVersion as string
    let data = ''
    let positive = ''
    let negative = ''
    if (headless) {
      [positive, negative] = serialized.split('.')
    }
    else {
      [meta, algVersion, data] = serialized.split(':');
      [positive, negative] = data.split('.')
    }

    const dataParse = dataParsersList[+algVersion]
    dataParse(fastIntSetToFill._[ESign.POSITIVE], positive)
    if (negative && fastIntSetToFill._[ESign.NEGATIVE].length)
      dataParse(fastIntSetToFill._[ESign.NEGATIVE], negative)

    return true
  },
}
