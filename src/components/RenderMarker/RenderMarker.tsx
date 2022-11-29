import React from "react";
import { Marker } from "react-map-gl";
import style from "./rendermarker.less";
export function RenderMarker({ array }: any) {
  return (
    <div>
      {array
        ? array.map((data: any) => {
            const name = data.Name;
            const id = data.$id;
            const parse = JSON.parse(data.Location);
            const lat = parse.Center[0];
            const lng = parse.Center[1];
            return (
              <Marker key={id} longitude={lng} latitude={lat}>
                <div className={style.marker}>{name}</div>
              </Marker>
            );
          })
        : ""}
    </div>
  );
}
