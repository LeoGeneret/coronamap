import React, { useState, useContext, useEffect } from "react";
import { gsap } from "gsap";
import { GlobalContext } from "./GlobalContext";
import CountUp from 'react-countup';
import { Power4 } from "gsap/gsap-core";


function Sidebar(props) {
  const apiDatas = useContext(GlobalContext);
  const globalDatas = apiDatas.value[0];
  const countries = apiDatas.value2[0];

  const [sideTabOpen, setSideTabOpen] = useState(false);
  const [countrySelected, setCountrySelected] = useState({});

  const handleOnClickCountry = (country) => {
    setCountrySelected(country);
    document.querySelector('.sideTab').classList.add('open')
  }

  useEffect(() => {
    let tl = gsap.timeline();
    tl.to(".mainTab", 1, { x: '0%', ease: Power4.easeOut});

  }, [])
  return (
    <div id="Sidebar">
      <div className="mainTab">
        <h1>
          COVID-19
          <br />
          Global Cases
        </h1>
        <div className="totalCasesSection">
          <p o>TOTAL CONFIRMED CASES</p>
          <CountUp className="cases" end={globalDatas.cases} />
        </div>
        <div className="countriesSection">
          {countries.map(country => {
            return (
              <div className="country" onClick={() => {handleOnClickCountry(country)}}>
                <p>{country.country}</p>
                <CountUp 
                duration={3}
                end={country.cases}
                // easingFn={(t: 0.22, b: 1, c: 0.36, d: 1) => country.cases } 
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="sideTab">
        <h1>{countrySelected.country}</h1>

      </div>
    </div>
  );
}
export default Sidebar;
