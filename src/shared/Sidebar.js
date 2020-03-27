import React, { useState, useContext, useEffect } from "react";
import { gsap } from "gsap";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import CountUp from "react-countup";
import { Power4 } from "gsap/gsap-core";

function Sidebar(props) {
  const apiDatas = useContext(GlobalContext);
  const globalDatas = apiDatas.value[0];
  const countries = apiDatas.value2[0];

  const [countrySelected, setCountrySelected] = useState({});
  const [newsCountry, setNewsCountry] = useState([]);


  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?qInTitle=coronavirus AND " +
          countrySelected.country.split(',')[0] +
          "&apiKey=ae3e89c9f20c473f96d3e3337a5139b7&sortBy=publishedAt"
      )
      .then(response => {
        console.log(response.data)
        console.log(response.data.articles)
        setNewsCountry(response.data.articles);
      });
  };

  const handleOnClickCountry = country => {
    console.log('1')
    setCountrySelected(country);
    document.querySelector(".sideTab").classList.add("open");
  };

  useEffect(() => {
    let tl = gsap.timeline();
    tl.to(".mainTab", 1, { x: "0%", ease: Power4.easeOut });
    
  }, []);

  useEffect(() => {
    if(countrySelected.country)
      getNews()
  }, [countrySelected]);


  return (
    <div id="Sidebar">
      <div className="mainTab">
        <h1>
          COVID-19
          <br />
          Global Cases
        </h1>
        <div className="totalCasesSection">
          <p>TOTAL CONFIRMED CASES</p>
          <CountUp className="cases" end={globalDatas.cases} />
        </div>
        <div className="countriesSection">
          {countries.map(country => {
            return (
              <div
                className="country"
                onClick={() => {
                  handleOnClickCountry(country);
                }}
              >
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
        <div className="news">
          <p>Last News</p>
          {newsCountry.slice(0, 3).map(article => {
            return (
              <div className="newsCard">
                <div className="imgContainer" style={{backgroundImage: `url(${article.urlToImage})`}}></div>
                <p>{article.title}</p>
              </div>
          )})}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
