import react, { useEffect, useState } from 'react';
import Style from './InteractiveBuildingStyle';
import SunsetApi from "../../services/api";
import Loading from '../Loading/Loading';


const InteractiveBuilding = () => {

  const fillLightsState = () => {
    let initialLightsState = new Array(12);
    for (let i = 0; i < initialLightsState.length; ++i) {
      initialLightsState[i] = "black";
    }

    return fillLightsState;
  }

  const fillWindowsPathsD = () => {
    let pathsD = new Array();
    pathsD.push("M367.5,155.9h58.3v96.5h-58.3V155.9L367.5,155.9z");
    pathsD.push("M367.5,312h58.3v96.5h-58.3V312z");
    pathsD.push("M466.9,312h58.3v96.5h-58.3V312L466.9,312z");
    pathsD.push("M573.3,312h58.3v96.5h-58.3V312z");
    pathsD.push("M573.3,472.4h58.3v96.5h-58.3V472.4z");
    pathsD.push("M470.8,472.4h58.3v96.5h-58.3V472.4z");
    pathsD.push("M367.5,472.4h58.3v96.5h-58.3V472.4z");
    pathsD.push("M367.5,630.2h58.3v96.5h-58.3V630.2z");
    pathsD.push("M470.8,630.2h58.3v96.5h-58.3V630.2z");
    pathsD.push("M573.3,630.2h58.3v96.5h-58.3V630.2z");
    pathsD.push("M466.9,155.9h58.3v96.5h-58.3V155.9L466.9,155.9z");
    pathsD.push("M573.3,155.9h58.3v96.5h-58.3V155.9L573.3,155.9z");


    return pathsD;
  }


  const [lightsState, setLightsState] = useState(fillLightsState());
  const [toggleAllLights, setToggleAllLights] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [initialBehaviorDone, setInitialBehaviorDone] = useState(false);

  const pathsD = fillWindowsPathsD();

  async function getSunsetApiResponseData() {
    try {
      const response = await SunsetApi.get("https://api.sunrise-sunset.org/json", {
        params: {
          lat: latitude,
          lng: longitude,
          day: 'today',
          formatted: 0,
        }
      });
      console.log(response.data.results);
      defineWindowsInitialBehavior(response.data.results);
      return response.data;
    }
    catch (error) {
      console.log('Não foi possível realizar ação de acordo com o horário!');
    }
  }

  function defineWindowsInitialBehavior(results) {
    let now = new Date();
    let sunset = new Date(results.sunset);
    let sunrise = new Date(results.sunrise);

    if (now.getTime() >= sunset.getTime() || now.getTime() <= sunrise.getTime()) {
      changeAllWindowsColors(true);
    } else /*if(now.getTime() < sunset.getTime() &&  now.getTime() > sunrise.getTime())*/ {
      changeAllWindowsColors(false);
    }

    setInitialBehaviorDone(true);
  }


  useEffect(() => {
    if (initialBehaviorDone == false) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        getSunsetApiResponseData();
      },
        (error) => {
          console.log(error);
        },
        {
          timeout: 30000,
        }
      );

    }
  });


  function changeWindowColor(windowNumber) {
    //if(lightsState)
    let currentColor = document.getElementById("window-" + windowNumber).style.fill;
    if (currentColor != "yellow") {
      currentColor = "yellow"
    } else {
      currentColor = "black";
    }

    document.getElementById("window-" + windowNumber).style.fill = currentColor;
  }

  //Called when toggleAllLights changes
  useEffect(() => {
    //console.log("ToggleAllLights " + toggleAllLights)

    if (initialBehaviorDone) {
      if (toggleAllLights) {
        for (let i = 0; i < 12; i++) {
          document.getElementById("window-" + i).style.fill = "yellow"
        }
        document.getElementById("master-button").innerText = "Apague todas as luzes";
        document.getElementById("master-button").style.color = "black";
      } else {
        for (let i = 0; i < 12; i++) {
          document.getElementById("window-" + i).style.fill = "black"
        }
        document.getElementById("master-button").innerText = "Acenda todas as luzes";
        document.getElementById("master-button").style.color = "yellow";
      }
    }
  });

  function changeAllWindowsColors(allLightsBehavior) {
    setToggleAllLights(allLightsBehavior);
  }

  return (
    <Style>
      {!initialBehaviorDone ?
        <Loading /> :
        <main>
          <svg version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
            <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
            <g>

              {/* BUILDING WALLS*/}
              <path d="M184.8,134h43.8v741.1h-43.8V134z" />
              <path d="M774,134h43.8v741.1H774V134z" />
              <path d="M280,81.2h43.8v782.3H280V81.2z" />
              <path d="M676.3,81.2H720v782.3h-43.8V81.2z" />
              <path d="M280,56.8h440v43.8H280V56.8z" />
              <path d="M191.2,134h95.2v43.8h-95.2V134z" />
              <path d="M707.1,134h95.2v43.8h-95.2V134z" />

              {/*BUILDING WINDOWS*/}
              {pathsD.map((pathD, index) => (
                <a /*xlinkTitle={"window-" + index}*/ id={"window-" + index} onClick={() => changeWindowColor(index)}>
                  <path d={pathD} />
                </a>
              ))
              }

              {/* FLOOR */}
              <path d="M990,903.4c0,22-21.5,39.8-48,39.8H58c-26.5,0-48-17.8-48-39.8l0,0c0-22,21.5-39.8,48-39.8h884C968.5,863.5,990,881.3,990,903.4L990,903.4z" />
            </g>
          </svg>
          <button id="master-button" onClick={() => changeAllWindowsColors(!toggleAllLights)}>
            Acenda todas as luzes
      </button>
        </main>}
    </Style>
  );

};

export default InteractiveBuilding;