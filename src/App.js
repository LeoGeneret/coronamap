import React, { useState, useEffect } from "react";
import "./scss/App.scss";
import Sidebar from "./shared/Sidebar.js";
import Map from "./shared/Map.js";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://corona.lmao.ninja/all")
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          setData(result);
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        error => {
          console.log("ya erreur chef");
        }
      );
  }, []);

  return (
    <div className="App">
      <Sidebar />
      {/* <Map /> */}
      <div className="data">
        <div className="global">Global cases : {data.cases}</div>
        <div className="global">Total death : {data.deaths}</div>
        <div className="global">Total recovered : {data.recovered}</div>
      </div>
    </div>
  );
}

export default App;
