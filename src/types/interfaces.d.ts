interface ISimplifiedNativeSet {
  /* Fully implemented */
  size: number //* but getter-based
  has: (item: number) => boolean
  values: () => number[]
  clear: () => void

  /* Partially implemented */
  add: (item: number) => void //* Don't returns this
  delete: (item: number) => void //* Don't returns boolean status of success
  forEach: (callback: (item: number) => void) => void //* ...

  /* Not implemented */
  // entries              //* Useless even in native Set
  // keys                 //* Useless even in native Set
  // [Symbol.toStringTag] //* Useless
  // [Symbol.iterator]    //* Unproductive and too verbose
}
interface IFutureNativeSet<I> { /// ECMA Future (See proposal: https://github.com/tc39/proposal-set-methods)
  intersection: (set: I) => I
  union: (set: I) => I
  difference: (set: I) => I
  symmetricDifference: (set: I) => I
  // TODO: Implement this
  // isSubsetOf: (set: ISimplifiedNativeSet) => boolean
  // isDisjointFrom: (set: ISimplifiedNativeSet) => boolean
  // isSupersetOf: (set: ISimplifiedNativeSet) => boolean
}

interface IStore {
  D: [DataField, DataField]
}

interface IFastSet extends ISimplifiedNativeSet, IStore {}
