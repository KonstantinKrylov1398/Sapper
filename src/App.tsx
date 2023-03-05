import React, { useEffect, useMemo, useRef, useState } from "react";
import { mapMaskToView, Mask } from "./typescript";
import { clickField } from "./utils/ClickField";
import { contextMenu } from "./utils/ContextMenu";
import { createField } from "./utils/CreateField";

export function App() {
  const Mine = -1;
  const smail: any = useRef();
  const size = 2;
  const dimension = new Array(size).fill(null);
  const [die, setDie] = useState(false);
  const [field, setField] = useState<any>(() => createField(size, Mine));
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
                    clickField(
                      mask,
                      Mask,
                      y,
                      x,
                      size,
                      field,
                      Mine,
                      setDie,
                      setMask
                    );
                  }}
                  onContextMenu={(e) => {
                    contextMenu(e, mask, y, x, size, Mask, setCounter, setMask);
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
