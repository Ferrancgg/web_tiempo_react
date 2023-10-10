import React, { useEffect, useState } from "react";
import "./CitySelector.css";
import SpinnerPage from "../../components/SpinnerPage/SpinnerPage";
import { APIkeyWeather } from "../../data/apiKey";
import Prevision_card from "../../components/Prevision_card/Prevision_card";

const CitySelector = () => {
  const [city, setCity] = useState("");
  const [citySelector, setCitySelector] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dataWeather, setDataWeather] = useState(null);
  const segundoFetch = (lat1,lon1) => {
    // setLoading(true);
  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon1}&appid=${APIkeyWeather}`)
      .then((response1) => response1.json())
      
      .then((data1) => setDataWeather(data1))
      .then(console.log(latitude))
      .finally(()=>setCitySelector(""))
     

    //   .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (citySelector === "") {
      // Evita realizar una solicitud si el campo está vacío
      setData(null);
      return;
    }
  
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/capital/${citySelector}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no se ejecutó correctamente");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLatitude(responseData[0].capitalInfo.latlng[0]);
        setLongitude(responseData[0].capitalInfo.latlng[1]);
        // Llama a segundoFetch después de que latitude y longitude se establezcan
        segundoFetch(responseData[0].capitalInfo.latlng[0],responseData[0].capitalInfo.latlng[1]);
      })
      .catch((error) => {
        console.error("Error al buscar la capital:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]);
  




  const buscar = () => {
    // Actualiza la ciudad para desencadenar la solicitud
    setCity(citySelector)
    
    ;
  };

  return (
    <main>
      <section className="search-container">
        <div className="search">
          <input
            placeholder="Escribe una Capital"
            type="text"
            value={citySelector}
            onChange={(ev) => {
              setCitySelector(ev.target.value);
            }}
          />
          <button onClick={buscar}>Buscar</button>
        </div>
        <div className="response">
          <h2>{city}</h2>
        </div>
        <div className="response-information">
          <p>Pais: {data ? data[0].name.common : ""}</p>
          <p>Continente: {data ? data[0].region : ""}</p>
        </div>
      </section>

      <section>
        {loading && <SpinnerPage />}
        {data && console.log(data)}
        {dataWeather && console.log(dataWeather)}
        {/* {dataWeather && console.log(dataWeather)} */}

        {dataWeather!==null?( <div className="fg-prevision-container"> 
          <Prevision_card fecha={dataWeather.list[0].dt_txt.slice(0,10)} temperatura={dataWeather.list[0].main.temp} sensacion={dataWeather.list[0].main.feels_like}icono={dataWeather.list[0].weather[0].main}/>
          <Prevision_card fecha={dataWeather.list[8].dt_txt.slice(0,10)} temperatura={dataWeather.list[8].main.temp} sensacion={dataWeather.list[8].main.feels_like}icono={dataWeather.list[8].weather[0].main}/>
          <Prevision_card fecha={dataWeather.list[16].dt_txt.slice(0,10)} temperatura={dataWeather.list[16].main.temp} sensacion={dataWeather.list[16].main.feels_like}icono={dataWeather.list[16].weather[0].main}/>
          <Prevision_card fecha={dataWeather.list[24].dt_txt.slice(0,10)} temperatura={dataWeather.list[24].main.temp} sensacion={dataWeather.list[24].main.feels_like}icono={dataWeather.list[24].weather[0].main}/>
          <Prevision_card fecha={dataWeather.list[32].dt_txt.slice(0,10)} temperatura={dataWeather.list[32].main.temp} sensacion={dataWeather.list[32].main.feels_like}icono={dataWeather.list[32].weather[0].main}/>
              </div>):<div>hola</div>}
      </section>
    </main>
  );
};

export default CitySelector;
