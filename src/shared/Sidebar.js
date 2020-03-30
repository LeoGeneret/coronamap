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
  const [openCountryTab, setOpenCountryTab] = useState(false)

  const styleadjust = () => {
    console.log(newsCountry);
  };
  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?qInTitle=coronavirus AND " +
          countrySelected.country.split(",")[0] +
          "&apiKey=ae3e89c9f20c473f96d3e3337a5139b7&sortBy=publishedAt&language=en"
      )
      .then(response => {
        var articles = response.data.articles;
        var newsFiltered = articles.filter(
          article => article.urlToImage !== null
        );
        setNewsCountry(newsFiltered);
      })
      .then(() => {
        styleadjust();
      });
  };

  const handleOnClickCountry = country => {
    console.log("1");
    setOpenCountryTab(true);
    setCountrySelected(country);
    document.querySelector(".sideTab").classList.add("open");
  };

  const handleCloseTab = () => {
    if(openCountryTab){
      setOpenCountryTab(false);
      document.querySelector('.sideTab').classList.remove('open');
      document.querySelector('.sideTab').classList.add('closed');
    } else {
      setOpenCountryTab(true);
      document.querySelector('.sideTab').classList.remove('closed');
      document.querySelector('.sideTab').classList.add('open');
    }
  }

  useEffect(() => {
    let tl = gsap.timeline();
    tl.to(".mainTab", 1, { x: "0%", ease: Power4.easeOut });
  }, []);

  useEffect(() => {
    if (countrySelected.country) getNews();
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
        {countrySelected.country && (
          <div>
            <h1>{countrySelected.country}</h1>
            <div className="totalCasesSection">
              <p>TOTAL CONFIRMED CASES</p>
              <CountUp
                className="casesCountry"
                end={countrySelected.cases}
                duration={0.75}
              />
            </div>
            <div className="section">
              <p className="sectionTitle">Cases in details</p>
              <div className="card cases">
                <div className="legend orange">
                  <div className="color"></div>
                  <p>Active cases</p>
                  {countrySelected.cases && (
                    <CountUp end={countrySelected.active} duration={0.75} />
                  )}
                </div>
                <div className="legend red">
                  <div className="color"></div>
                  <p>Deaths</p>
                  {countrySelected.cases && (
                    <CountUp end={countrySelected.deaths} duration={0.75} />
                  )}
                </div>
                <div className="legend green">
                  <div className="color"></div>
                  <p>Recovered cases</p>
                  {countrySelected.cases && (
                    <CountUp end={countrySelected.recovered} duration={0.75} />
                  )}
                </div>
              </div>
            </div>
            <div className="news section">
              <p className="sectionTitle">Latest News</p>
              {newsCountry &&
                newsCountry.slice(0, 3).map(article => {
                  return (
                    <a
                      className="newsCard"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="imgContainer"
                        style={{
                          backgroundImage: `url(${article.urlToImage})`
                        }}
                      ></div>
                      <div className="infoContainer">
                        <p>{article.title}</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        )}

        <div className="closeTab" onClick={() => {handleCloseTab()}}>
          <svg className={openCountryTab ? '' : 'closed'} width="5" height="8" viewBox="0 0 5 8" fill="none">
            <path
              d="M5 6.95969V1.04031C5 0.621059 4.51503 0.387973 4.18765 0.649878L0.488043 3.60957C0.23784 3.80973 0.23784 4.19027 0.488043 4.39043L4.18765 7.35012C4.51503 7.61203 5 7.37894 5 6.95969Z"
              fill="#767676"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
