const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=49.2606&longitude=123.246&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=America%2FLos_Angeles';


async function fetchDataFromAPI() {
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
      throw error; 
    }
}


async function main() {
    const data = await fetchDataFromAPI();
    
    // Air temperature at 2 meters above ground (°C)
    const temperatureData = data.hourly.temperature_2m;

    // Total precipitation (rain, showers, snow) sum of the preceding hour 
    // (mm)
    const precipitation = data.hourly.precipitation;

    // Preceding hour probability (%)
    //Probability of precipitation with more than 0.1 mm of the preceding hour
    const precipitation_probability = data.hourly.precipitation_probability;

    // Apparent temperature is the perceived feels-like temperature combining wind chill factor, relative humidity and solar radiation
    //(°C)
    const apparent_temperature = data.hourly.apparent_temperature;

    // Sun rise
    const sunrise = data.daily.sunrise;

    // Sun set
    const sunset = data.daily.sunset;

    // Daily maximum in UV Index starting from 0
    const uv_index_max = data.daily.uv_index_max;

    // Maximum daily air temperature at 2 meters above ground
    const temperature_2m_max = data.daily.temperature_2m_max;

    // Minimum daily air temperature at 2 meters above ground
    const temperature_2m_min = data.daily.temperature_2m_min;

    // DAILY probability of precipitation
    const precipitation_probability_max = data.daily.precipitation_probability_max;

    // Rain from large scale weather systems of the preceding hour in millimeter
    // (mm)
    const rain = data.hourly.rain;
    
    
    console.log(apparent_temperature[0]);
    

    //console.log(uv_index_max);
    //[4.65, 3, 4.05, 4.4, 2.65, 2.8, 2.45]


    todayWeather(uv_index_max[0], precipitation[0], temperatureData[0]);
    todayOtherInfo(precipitation_probability, apparent_temperature, sunrise, sunset, uv_index_max);
    weekWeather(precipitation_probability_max, temperature_2m_max, temperature_2m_min);
    
    
}


function todayWeather(uv_index, precip, temp) {
  const sun_cloud = document.getElementById("cloudy-sun");
  const cloud = document.getElementById("cloud");
  const sun = document.getElementById("sunny-sun");

  if (uv_index >= 6) {
    sun_cloud.style.display = "none";
    cloud.style.display = "none";
    sun.style.display = "block";

  } else if (uv_index>= 3){
    sun_cloud.style.display = "block";
    cloud.style.display = "block";
    sun.style.display = "none";
  } else {
    sun_cloud.style.display = "none";
    cloud.style.display = "block";
    sun.style.display = "none";
  }

  document.getElementById("today-temp").innerHTML = temp + "°";
  //console.log(uv_index, precip);
}

function todayOtherInfo(precipitation_probability, apparent_temperature, sunrise, sunset, uv_index_max) {
  const sunriseTime = new Date(sunrise[0]);
  const sunsetTime = new Date (sunset[0]);
  document.getElementById("precip-prob").innerHTML = "Precipitation Probability: " + precipitation_probability[0] + "%";
  document.getElementById("apparent-temp").innerHTML = "Apparent Temperature: " + apparent_temperature[0] + "°";
  document.getElementById("sunrise").innerHTML = "Sunrise: " + sunriseTime.getHours() + ":" + sunriseTime.getMinutes();
  document.getElementById("sunset").innerHTML = "Sunset: " + sunsetTime.getHours() + ":" + sunsetTime.getMinutes();
  document.getElementById("uv-index").innerHTML = "UV Index: " + uv_index_max[0];
}


function weekWeather(precipitation_probability_max, temperature_2m_max, temperature_2m_min) {
  for (let i = 0; i <= 6; i++) {
    document.getElementById("date" + i).innerHTML = getWeekday(i);
    document.getElementById("max-temp-" + i).innerHTML = "Max temp: " + temperature_2m_max[i] + "°";
    document.getElementById("min-temp-" + i).innerHTML = "Min temp: " + temperature_2m_min[i] + "°";
    document.getElementById("precip-" + i).innerHTML = "Precip: " + precipitation_probability_max[i] + "%";
  }
}

function getWeekday(i) {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
  const d = new Date();
  let dateNum = d.getDay() + i;
  if (dateNum > 6) {
    dateNum = dateNum - 7;
  }

  return weekday[dateNum];
  
}







// Call the main function to start the process
main();















  