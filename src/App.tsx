import React, { useEffect, useMemo, useRef, useState } from "react";
const Mine = -1;
function createField(size: number) {
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

export enum Mask {
  Transparent,
  Fill,
  Flag,
  Question,
}
export const mapMaskToView: Record<Mask, React.ReactNode> = {
  [Mask.Transparent]: null,
  [Mask.Fill]: "💐",
  [Mask.Flag]: "🏁",
  [Mask.Question]: "❓️",
};
export function App() {
  const smail: any = useRef();
  const size = 16;
  const dimension = new Array(size).fill(null);
  const [die, setDie] = useState(false);
  const [field, setField] = useState<any>(() => createField(size));
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(40);
  const [mask, setMask] = useState<Mask[]>(() =>
    new Array(size * size).fill(Mask.Fill)
  );
  const win = useMemo(
    () =>
      field.every(
        (f: any, i: any) =>
          (f === Mine && mask[i] === Mask.Flag) || mask[i] === Mask.Transparent
      ),
    [field, mask]
  );
  const restartGame = () => {
    mask.forEach((_, i) => (mask[i] = Mask.Fill));
    setCounter(40);
    setMask((prev) => [...prev]);
    setTimer(0);
    setDie(false);
    smail.current.textContent = "😊";
  };
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const getMinutes = minutes > 10 ? minutes % 60 : `0${minutes % 60}`;
    const getHours = `${Math.floor(timer / 3600)}`;
    return getHours + ":" + getMinutes;
  };

  useEffect(() => {
    setInterval(() => setTimer((e): number => e + 1), 1000);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "30%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div>{counter}</div>
        <div
          ref={smail}
          onClick={() => {
            restartGame();
          }}
        >
          {"😊"}
        </div>
        <div>{formatTime()}</div>
      </div>
      {dimension.map((_, y) => {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            {dimension.map((_, x) => {
              return (
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "24px",
                    height: "24px",
                    margin: "10px",
                  }}
                  onMouseDown={() => (smail.current.textContent = "😨")}
                  onMouseUp={() => (smail.current.textContent = "😊")}
                  onClick={() => {
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
                      mask.forEach(
                        (_: any, i: any) => (mask[i] = Mask.Transparent)
                      );
                      setDie(true);
                    }
                    setMask((prev: any) => [...prev]);
                  }}
                  onContextMenu={(e) => {
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
                  }}
                >
                  {mask[y * size + x] !== Mask.Transparent
                    ? mapMaskToView[mask[y * size + x]]
                    : field[y * size + x] === Mine
                    ? "💣"
                    : field[y * size + x]}
                </div>
              );
            })}
          </div>
        );
      })}
      <div>
        {die
          ? (smail.current.textContent = "😞")
          : win
          ? (smail.current.textContent = "😎 ")
          : ""}
      </div>
    </div>
  );
}
