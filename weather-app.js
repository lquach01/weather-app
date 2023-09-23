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
    
    //document.getElementById("today-temp").innerHTML = temperatureData[0];
      
    

    //console.log(uv_index_max);
    //[4.65, 3, 4.05, 4.4, 2.65, 2.8, 2.45]



    const sun_cloud = document.getElementById("cloudy-sun");
    const cloud = document.getElementById("cloud");
    const sun = document.getElementById("sunny-sun");

    if (uv_index_max[0] >= 4) {
      sun_cloud.style.display = "none";
      cloud.style.display = "none";
      sun.style.display = "block";

    } else if (uv_index_max[0] >= 3){
      sun_cloud.style.display = "block";
      cloud.style.display = "block";
      sun.style.display = "none";
    } else {
      sun_cloud.style.display = "none";
      cloud.style.display = "block";
      sun.style.display = "none";
    }


}

// Call the main function to start the process
main();















  