export function countBits(n: number): number {
  const r = n - ((n >> 1) & 0x55555555);
  const r2 = (r & 0x33333333) + ((r >> 2) & 0x33333333);
  return ((r2 + (r2 >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
}
