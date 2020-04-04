import React, { useState, useEffect } from 'react';
import './scss/all.scss';
import axios from 'axios';
import Sidebar from './shared/Sidebar';
import { GlobalContext } from './shared/GlobalContext';
import Map from './shared/Map';

function App() {
  const [globalDatas, setGlobalDatas] = useState({});
  const [countriesDatas, setCountriesDatas] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [mapSVG, setMapSVG] = useState('');
  const [deathsMapSVG, setDeathsMapSVG] = useState('');

  const dataFetch = () => {
    const globalDatasAPI = axios
      .get('https://corona.lmao.ninja/all')
      .then((response) => {
        setGlobalDatas(response.data);
      });
    const countriesDatasAPI = axios
      .get('https://corona.lmao.ninja/countries')
      .then((response) => {
        response.data.sort((a, b) => b.cases - a.cases);
        setCountriesDatas(response.data);
      });
    const mapAPI = axios
      .get(
        'https://upload.wikimedia.org/wikipedia/commons/2/26/COVID-19_Outbreak_World_Map.svg',
      )
      .then((response) => {
        setMapSVG(response.data);
      });

    const deathsMapAPI = axios
      .get(
        'https://upload.wikimedia.org/wikipedia/commons/2/2d/COVID-19_Outbreak_World_Map-Deaths.svg',
      )
      .then((response) => {
        setDeathsMapSVG(response.data);
      });

    axios
      .all([globalDatasAPI, countriesDatasAPI, mapAPI, deathsMapAPI])
      .then(() => setDataFetched(true));
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div className="App">
      <div className={`loader ${dataFetched ? 'ready' : null}`}>
        <div className="loadingio-spinner-wedges-1d6kj5xtu6">
          <div className="ldio-r1btqnfa2xs">
            <div>
              <div>
                <div />
              </div>
              <div>
                <div />
              </div>
              <div>
                <div />
              </div>
              <div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
      {dataFetched && (
        <GlobalContext.Provider
          value={{
            value: [globalDatas, setGlobalDatas],
            value2: [countriesDatas, setCountriesDatas],
            value3: [mapSVG, setMapSVG],
            value4: [deathsMapSVG, setDeathsMapSVG],
          }}
        >
          <Sidebar />
          {mapSVG !== '' && <Map />}
        </GlobalContext.Provider>
      )}
    </div>
  );
}

export default App;
