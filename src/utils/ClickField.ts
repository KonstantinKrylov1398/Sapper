export function clickField(
  mask: any,
  Mask: any,
  y: any,
  x: any,
  size: any,
  field: any,
  Mine: any,
  setDie: any,
  setMask: any
) {
  if (mask[y * size + x] === Mask.Transparent) return;
  const clearing: [x: number, y: number][] = [];
  function clear(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (mask[y * size + x] === Mask.Transparent) return;
      clearing.push([x, y]);
    }
  }
  clear(x, y);
  while (clearing.length) {
    const [x, y] = clearing.pop()!!;
    mask[y * size + x] = Mask.Transparent;
    if (field[y * size + x] !== 0) continue;
    clear(x + 1, y);
    clear(x - 1, y);
    clear(x, y + 1);
    clear(x, y - 1);
  }
  if (field[y * size + x] === Mine) {
    mask.forEach((_: any, i: any) => (mask[i] = Mask.Transparent));
    setDie(true);
  }
  setMask((prev: any) => [...prev]);
}
