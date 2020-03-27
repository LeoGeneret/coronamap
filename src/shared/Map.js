import React, {useContext, useEffect} from "react";
import { gsap } from "gsap";
import { GlobalContext } from "./GlobalContext";
import { Power4 } from "gsap/gsap-core";

function Map() {

  const apiDatas = useContext(GlobalContext);
  const mapSVG = apiDatas.value3[0];

  const styleAdjust = () => {
    var svgTag = document.querySelector('.mapContainer svg')
    svgTag.setAttribute('viewBox', '-40 -20 1032 523');
    var gTagSize = document.querySelector('.currentLayer').getBoundingClientRect();
    svgTag.style.height = gTagSize.height;
    svgTag.style.width = gTagSize.width;
  }
  useEffect(() => {
    styleAdjust()
    let tl = gsap.timeline();
    tl.to(".mapContainer", 1.5, { opacity: '1', ease: Power4.easeOut}, '+=1');
    
  }, [])

  return (
    <div className="mapSection">
      <div
        className="mapContainer"
        dangerouslySetInnerHTML={{ __html: mapSVG }}
      ></div>
    </div>
  );
}

export default Map;
