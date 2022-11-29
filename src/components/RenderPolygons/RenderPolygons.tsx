import React from "react";
import { Layer, Source } from "react-map-gl";
export function RenderPolygons({ array }: any) {
  const geoJson: any = (coordinates: any) => ({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: coordinates },
      },
    ],
  });

  const layerStyle: any = {
    id: "border",
    type: "line",
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  };
  return (
    <div>
      {array
        ? array.map((data: any) => {
            const id = data.$id;
            const parse = JSON.parse(data.Location);
            const polygon = parse.Polygon;
            return (
              <Source key={id} type="geojson" data={geoJson(polygon)}>
                <Layer {...layerStyle}></Layer>
              </Source>
            );
          })
        : ""}
    </div>
  );
}
