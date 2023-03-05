export function createField(size: number, Mine: -1) {
  const array = new Array(size * size).fill(0);
  function inc(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (array[y * size + x] === Mine) return;
      array[y * size + x] += 1;
    }
  }
  for (let i = 0; i < 40; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (array[y * size + x] === Mine) continue;
    array[y * size + x] = Mine;
    i += 1;

    inc(x + 1, y);
    inc(x - 1, y);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
    inc(x, y + 1);
    inc(x, y - 1);
  }
  return array;
}
