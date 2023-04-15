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

export function isSubsetAofB(dfMain: DataField, dfSecondary: DataField): boolean {
  if (!dfMain.length || !dfSecondary.length)
    return false
  let i = dfMain.length
  while (i--) {
    const mainFrag = dfMain[i]
    if (!mainFrag)
      continue
    const secFrag = dfSecondary[i]
    const isSubsetFrag = (mainFrag | secFrag) === secFrag
    if (!isSubsetFrag)
      return false
  }
  return true
}

export function isDisjointsAB(dfMain: DataField, dfSecondary: DataField): boolean {
  if (!dfMain.length || !dfSecondary.length)
    return true
  let i = dfMain.length
  while (i--) {
    const mainFrag = dfMain[i]
    const secFrag = dfSecondary[i]
    const isIntersectsFrag = (mainFrag & secFrag) !== 0
    if (isIntersectsFrag)
      return false
  }
  return true
}
