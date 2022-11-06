import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태 정보가 들어간다
//3. 5개의 버튼이 있다 (현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [city,setCity] = useState("");
  const cities=['paris','tokyo','new york','seoul'];
  const [weather,setWeather] = useState(null);
  const [loading,setLoading] = useState(false);
  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat,lon)
    })
  };

  const getWeatherByCurrentLocation = async (lat,lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fcf89fa788f3a154b00bcc3ceab4971f&units=metric`
    setLoading(true)
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data)
    setLoading(false)
  }

  const getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fcf89fa788f3a154b00bcc3ceab4971f&units=metric`
    setLoading(true)
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data)
    setLoading(false)
  }

  useEffect(()=>{
    if(city == ""){
      getCurrentLocation()
    }else{
      getWeatherByCity()
    }
    
  },[city])


  return (
    <div >
      {loading? (
        <div className='main'>
        <ClipLoader color={"#ffffff"} loading={loading} size={150} />
        </div>
      ) : (
        <div className='main'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity}/>
        </div>
      )}
      
    </div>
  );
}

export default App;
