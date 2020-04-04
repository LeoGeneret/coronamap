import React, { useState, useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import axios from 'axios';
import CountUp from 'react-countup';
import { Power4 } from 'gsap/gsap-core';
import Collapse from 'react-css-collapse';
import { GlobalContext } from './GlobalContext';

gsap.registerPlugin(ScrollToPlugin);


function Sidebar() {
  const apiDatas = useContext(GlobalContext);
  const globalDatas = apiDatas.value[0];
  const countries = apiDatas.value2[0];

  const [countrySelected, setCountrySelected] = useState({});
  const [newsCountry, setNewsCountry] = useState([]);
  const [openCountryTab, setOpenCountryTab] = useState(false);
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const getNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?qInTitle=coronavirus AND ${
          countrySelected.country.split(',')[0]
        }&apiKey=ae3e89c9f20c473f96d3e3337a5139b7&sortBy=publishedAt&language=en`,
      )
      .then((response) => {
        const { articles } = response.data;
        const newsFiltered = articles.filter(
          (article) => article.urlToImage !== null,
        );
        setNewsCountry(newsFiltered);
      });
  };

  const handleOnClickCountry = (country) => {
    setOpenCountryTab(true);
    setCountrySelected(country);
  };

  useEffect(() => {
    const countryCard = document.querySelector('.sideTab');
    if (countryCard.offsetHeight > window.innerHeight)
      gsap.to(window, { duration: 0.75, scrollTo: 0 });
  }, [newsCountry]);

  const handleCloseTab = () => {
    setMoreDetailsOpen(false);
    setCountrySelected({});
    if (openCountryTab)
      setOpenCountryTab(false);
    else
      setOpenCountryTab(true);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    if (window.innerWidth > 900) tl.to('.mainTab', 1, { x: '0%', ease: Power4.easeOut });
    // else
    tl.to('.mainTab', 1, { y: '0%', ease: Power4.easeOut });
  }, []);

  useEffect(() => {
    if (countrySelected.country) getNews();
  }, [countrySelected]);

  useEffect(() => {
    const resultsFiltered = countries.filter((country) => country.country.toLowerCase().includes(searchValue.toLowerCase()));
    setSearchResult(resultsFiltered);
  }, [searchValue]);

  return (
    <div id="Sidebar">
      <div className={`mainTab ${openCountryTab ? 'background' : ''}`}>
        <div className="grabber" />
        <div className="infos">
          <h1>
            COVID-19
            <br />
            Global Cases
          </h1>
          <div className="totalCasesSection">
            <p>TOTAL CONFIRMED CASES</p>
            <CountUp className="cases" end={globalDatas.cases} />
          </div>
          <div className="totalCasesSection">
            <p>TOTAL ACTIVES CASES</p>
            <CountUp className="cases orange" end={globalDatas.active} />
          </div>
          <div className="totalCasesSection">
            <p>TOTAL RECOVERED CASES</p>
            <CountUp className="cases green" end={globalDatas.recovered} />
          </div>
          <div className="totalCasesSection">
            <p>TOTAL DEATHS CASES</p>
            <CountUp className="cases red" end={globalDatas.deaths} />
          </div>
          <div className="country">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(value) => handleSearchChange(value)}
            />
          </div>
        </div>
        <div className="countriesSection">
          {searchResult.map((country) => (
            <div
              className="country"
              onClick={() => {
                handleOnClickCountry(country);
              }}
            >
              <p>{country.country}</p>
              <CountUp
                duration={0.75}
                end={country.cases}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`sideTab ${openCountryTab ? 'open' : 'closed'}`}>
        {countrySelected.country && (
          <div className="scrollView">
            <div
              className="closeCross"
              onClick={() => {
                handleCloseTab();
              }}
            />
            <h1>{countrySelected.country}</h1>
            <div className="totalCasesSection">
              <p>TOTAL CONFIRMED CASES</p>
              <CountUp
                className="casesCountry"
                end={countrySelected.cases}
                duration={0.75}
              />
            </div>
            <div className="countryDetails">
              <div className="section">
                <p className="sectionTitle">Cases in details</p>
                <div className="card cases">
                  <div className="legend orange">
                    <div className="color" />
                    <p>Active cases</p>
                    {countrySelected.cases && (
                      <CountUp end={countrySelected.active} duration={0.75} />
                    )}
                  </div>
                  <div className="legend red">
                    <div className="color" />
                    <p>Deaths</p>
                    {countrySelected.cases && (
                      <CountUp end={countrySelected.deaths} duration={0.75} />
                    )}
                  </div>
                  <div className="legend green">
                    <div className="color" />
                    <p>Recovered cases</p>
                    {countrySelected.cases && (
                      <CountUp
                        end={countrySelected.recovered}
                        duration={0.75}
                      />
                    )}
                  </div>
                  <Collapse isOpen={moreDetailsOpen}>
                    <div className="legend grey">
                      <div className="color" />
                      <p>Today cases</p>
                      {countrySelected.cases && (
                        <CountUp
                          end={countrySelected.todayCases}
                          duration={0.75}
                        />
                      )}
                    </div>
                    <div className="legend grey">
                      <div className="color" />
                      <p>Today deaths</p>
                      {countrySelected.cases && (
                        <CountUp
                          end={countrySelected.todayDeaths}
                          duration={0.75}
                        />
                      )}
                    </div>
                    <div className="legend grey">
                      <div className="color" />
                      <p>Cases per one million</p>
                      {countrySelected.cases && (
                        <CountUp
                          end={countrySelected.casesPerOneMillion}
                          duration={0.75}
                        />
                      )}
                    </div>
                    <div className="legend grey">
                      <div className="color" />
                      <p>Deaths per one million</p>
                      {countrySelected.cases && (
                        <CountUp
                          end={countrySelected.deathsPerOneMillion}
                          duration={0.75}
                        />
                      )}
                    </div>
                  </Collapse>
                  <div
                    className={`moreButton ${moreDetailsOpen ? 'open' : ''}`}
                    onClick={() => {
                      setMoreDetailsOpen(!moreDetailsOpen);
                    }}
                  >
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
                      <path
                        d="M5 6.95969V1.04031C5 0.621059 4.51503 0.387973 4.18765 0.649878L0.488043 3.60957C0.23784 3.80973 0.23784 4.19027 0.488043 4.39043L4.18765 7.35012C4.51503 7.61203 5 7.37894 5 6.95969Z"
                        fill="#767676"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {newsCountry[0] && (
                <div className="news section">
                  <p className="sectionTitle">Latest News</p>
                  {newsCountry.slice(0, 3).map((article) => (
                    <a
                      className="newsCard"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="imgContainer"
                        style={{
                          backgroundImage: `url(${article.urlToImage})`,
                        }}
                      />
                      <div className="infoContainer">
                        <p>{article.title}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className="closeTab"
          onClick={() => {
            handleCloseTab();
          }}
        >
          <svg
            className={openCountryTab ? '' : 'closed'}
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
          >
            <path
              d="M5 6.95969V1.04031C5 0.621059 4.51503 0.387973 4.18765 0.649878L0.488043 3.60957C0.23784 3.80973 0.23784 4.19027 0.488043 4.39043L4.18765 7.35012C4.51503 7.61203 5 7.37894 5 6.95969Z"
              fill="#767676"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
