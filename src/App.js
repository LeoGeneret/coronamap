import React, { useState, useEffect } from "react";
import "./scss/all.scss";
import axios from "axios";
import Sidebar from "./shared/Sidebar.js";
import { GlobalContext } from "./shared/GlobalContext.js";
import Map from "./shared/Map.js";

function App() {
  const [globalDatas, setGlobalDatas] = useState({});
  const [countriesDatas, setCountriesDatas] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [mapSVG, setMapSVG] = useState("");

  const lol = "<H1>HELLO</H1>";

  const dataFetch = () => {
    const globalDatasAPI = axios
      .get("https://corona.lmao.ninja/all")
      .then(response => {
        setGlobalDatas(response.data);
      });
    const countriesDatasAPI = axios
      .get("https://corona.lmao.ninja/countries")
      .then(response => {
        setCountriesDatas(response.data);
      });
    const mapAPI = axios
      .get(
        "https://upload.wikimedia.org/wikipedia/commons/archive/3/3b/20200320123012%21COVID-19_Outbreak_World_Map_per_Capita.svg"
      )
      .then(response => {
        setMapSVG(response.data);
      });

    axios
      .all([globalDatasAPI, countriesDatasAPI, mapAPI])
      .then(() => setDataFetched(true));
  };

  

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="App">
      <div className={`loader ${dataFetched ? 'ready' : null}`}>
        <p>Data's fetching</p>
      </div>
      {dataFetched && (
        <GlobalContext.Provider
          value={{
            value: [globalDatas, setGlobalDatas],
            value2: [countriesDatas, setCountriesDatas]
          }}
        >
          <Sidebar />
          {/* <Map /> */}
          {/* <div class="mapSection">
            {mapSVG !== "" && (
              <div
                className="mapContainer"
                dangerouslySetInnerHTML={{ __html: mapSVG }}
              ></div>
            )}
          </div> */}
        </GlobalContext.Provider>
      )}
    </div>
  );
}

export default App;
