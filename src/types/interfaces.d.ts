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

type FastSetDataField = number[];

interface IStoreUnsigned {
  // static TAG: string // Must be in the class
  P: FastSetDataField
}
interface IStoreSigned extends IStoreUnsigned {
  N: FastSetDataField
}
interface IStore extends IStoreUnsigned {
  N?: FastSetDataField
}

interface IFastSetInt extends ISimplifiedNativeSet, IStoreSigned {}
interface IFastSetUint extends ISimplifiedNativeSet, IStoreUnsigned {}
interface IFastSet extends ISimplifiedNativeSet, IStore {}
