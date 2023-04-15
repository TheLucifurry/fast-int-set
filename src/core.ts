import { max2, min2 } from './utils/extremum'

import type { DataField } from './types/global'

export function intersection(dfResult: DataField, dfMain: DataField, dfSecondary: DataField): void {
  let i = min2(dfMain.length, dfSecondary.length)
  while (i--)
    dfResult[i] = dfMain[i] & dfSecondary[i]
}

export function union(dfResult: DataField, dfMain: DataField, dfSecondary: DataField): void {
  let i = max2(dfMain.length, dfSecondary.length)
  while (i--)
    dfResult[i] = dfMain[i] | dfSecondary[i]
}

export function difference(dfResult: DataField, dfMain: DataField, dfSecondary: DataField): void {
  let i = dfMain.length
  while (i--)
    dfResult[i] = dfMain[i] & ~dfSecondary[i]
}

export function symmetricDifference(dfResult: DataField, dfMain: DataField, dfSecondary: DataField): void {
  let i = max2(dfMain.length, dfSecondary.length)
  while (i--)
    dfResult[i] = dfMain[i] ^ dfSecondary[i]
}
