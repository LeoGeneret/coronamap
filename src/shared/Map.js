import React, { useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Power4 } from 'gsap/gsap-core';
import { GlobalContext } from './GlobalContext';

function Map() {
  const apiDatas = useContext(GlobalContext);
  const mapSVG = apiDatas.value3[0];
  const deathsMapSVG = apiDatas.value4[0];

  const [mapActive, setMapActive] = useState(true);
  const [disabledInput, setDisabledInput] = useState(false);

  const styleAdjust = () => {
    const svgTag = document.querySelector('.svgContainer svg');
    const titleTag = document.querySelector('title');
    const currentLayer = document.querySelector('.currentLayer');
    currentLayer.removeAttribute('transform');
    titleTag.remove();
    svgTag.setAttribute('viewBox', '-40 -20 1032 523');

    const svgPath = document.querySelectorAll('.svgContainer path');
    for (let i = 0; i < svgPath.length; i += 1) {
      const elAttr = svgPath[i].getAttribute('style');
      if (elAttr.includes('fill:#000000')) {
        svgPath[i].style.fill = '#0F0F10';
      }
      if (elAttr.includes('fill:#c80200')) {
        svgPath[i].style.fill = '#e3292A';
      }
    }

    // pathBlack.style.fill = "#0F0F10"
  };

  const tl = gsap.timeline();

  const mapEntrance = () => {
    styleAdjust();
    if (window.innerWidth > 900) {
      tl.to('.svgContainer', 0.5, { opacity: '1', ease: Power4.easeOut }, '+=1');
      tl.to('.mapSwitchContainer', 0.5, { opacity: '1', ease: Power4.easeOut });
    } else {
      tl.to('.svgContainer', 0.75, { opacity: '1', ease: Power4.easeOut });
      tl.to('.mapSwitchContainer', 0.5, { opacity: '1', ease: Power4.easeOut });
    }
  };

  const disabledChecker = () => {
    setDisabledInput(true);
    setTimeout(() => {
      setDisabledInput(false);
    }, 1500);
  };

  const handleMapChange = () => {
    disabledChecker();
    tl.to('.svgContainer', 0.45, { opacity: '0', ease: Power4.easeOut });
    // document.querySelector('.mapSwitch input').disabled = true;

    setTimeout(() => {
      setMapActive(!mapActive);
      styleAdjust();
      tl.to(
        '.svgContainer',
        0.45,
        { opacity: '1', ease: Power4.easeOut },
        '+=0.5',
      );
    }, 150);
  };

  useEffect(() => {
    mapEntrance();
  }, []);

  return (
    <div className="mapSection">
      <div className="mapContainer">
        <div
          className="svgContainer"
          dangerouslySetInnerHTML={
            mapActive ? { __html: mapSVG } : { __html: deathsMapSVG }
          }
        />
        <div className="mapSwitchContainer">
          <p>Cases</p>
          <div className="mapSwitch">
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => handleMapChange()}
                disabled={disabledInput}
              />
              <span className="slider round" />
            </label>
          </div>
          <p>Deaths</p>
        </div>
        <div className="sourcesInfo">
          <p>DATAS: Worldometers - MAPS: Wikimedia</p>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1C6.61553 1 5.26215 1.41054 4.11101 2.17971C2.95987 2.94888 2.06266 4.04213 1.53285 5.32122C1.00303 6.6003 0.86441 8.00776 1.13451 9.36563C1.4046 10.7235 2.07129 11.9708 3.05026 12.9497C4.02922 13.9287 5.2765 14.5954 6.63437 14.8655C7.99224 15.1356 9.3997 14.997 10.6788 14.4672C11.9579 13.9373 13.0511 13.0401 13.8203 11.889C14.5895 10.7378 15 9.38447 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1ZM9 9.5V11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73479 12 7.48043 11.8946 7.2929 11.7071C7.10536 11.5196 7 11.2652 7 11V8C7 7.73478 7.10536 7.48043 7.2929 7.29289C7.48043 7.10536 7.73479 7 8 7C8.26522 7 8.51957 7.10536 8.70711 7.29289C8.89464 7.48043 9 7.73478 9 8V9.5ZM8.707 5.707C8.54338 5.87057 8.32811 5.97235 8.09786 5.99499C7.86761 6.01763 7.63664 5.95973 7.44429 5.83116C7.25195 5.70259 7.11013 5.51131 7.04301 5.2899C6.97589 5.0685 6.98762 4.83066 7.07619 4.61693C7.16477 4.4032 7.32471 4.2268 7.52877 4.11777C7.73283 4.00875 7.96838 3.97386 8.19529 4.01904C8.42219 4.06422 8.62641 4.18668 8.77314 4.36555C8.91988 4.54442 9.00005 4.76864 9 5C8.99994 5.26519 8.89455 5.51951 8.707 5.707Z"
              fill="#F5F5F5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Map;
