export const MAX_BITS = 32;
export const MAX_ARRAY_LENGTH = 2 ** 32;
export const SERIALIZED_STRING_PREFIX = `@npm/fast-int-set/`;

// Unfortunately, esbuild doesn't support const-enum inlining, i used build-defines instead
// export const enum ESign {
//   POSITIVE = 0,
//   NEGATIVE = 1,
// }
