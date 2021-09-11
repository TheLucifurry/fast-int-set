export default function binToHex(binary: number): string {
  return (binary >>> 0).toString(16).padStart(8, '0');
};
