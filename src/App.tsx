import React, { useEffect, useState } from "react";
import "./main.global.less";
import { Map } from "react-map-gl";
import { RenderMarker } from "./components/RenderMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { RenderPolygons } from "./components/RenderPolygons";
export function App() {
  const [array, setArray] = useState([]);
  const [viewState, setViewState] = useState({
    longitude: 41.4074,
    latitude: 45.62935,
    zoom: 12.8,
  });
  useEffect(() => {
    axios
      .get(
        "http://agro.energomera.ru:3060/api/field?lastChangeDate=2022-01-01T10:00:00.000&skip=0&take=100"
      )
      .then((res) => {
        console.log(res.data);
        setArray(res.data);
      });
  }, []);

  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoia29uc3RhbnRpbjE5OTgiLCJhIjoiY2xiMTd4bmV4MW5kNzNwcW1hNDl3b2x3ZCJ9.SbZxocS0_goaZtQnuvIs7g"
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "1200px" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <RenderMarker array={array} />
      <RenderPolygons array={array} />
    </Map>
  );
}
