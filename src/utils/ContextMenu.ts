export function contextMenu(
  e: any,
  mask: any,
  y: any,
  x: any,
  size: any,
  Mask: any,
  setCounter: any,
  setMask: any
) {
  e.preventDefault();
  if (mask[y * size + x] === Mask.Transparent) return;
  if (mask[y * size + x] === Mask.Fill) {
    setCounter((e: any) => e - 1);
    mask[y * size + x] = Mask.Flag;
  } else if (mask[y * size + x] === Mask.Flag) {
    setCounter((e: any) => e + 1);
    mask[y * size + x] = Mask.Question;
  } else if (mask[y * size + x] === Mask.Question) {
    mask[y * size + x] = Mask.Fill;
  }

  setMask((prev: any) => [...prev]);
}
