// Define a function to handle the data
function processData(temperatureData, precipitation, precipitation_probability, apparent_temperature, sunrise, sunset, precipitation_probability_max, uv_index_max) {
  // You can use temperatureData here or perform any other actions
  console.log('Temperature data:', temperatureData);
  console.log('precip:', precipitation);
  console.log('Precip Prob:', precipitation_probability);
  console.log('apparent temp:', apparent_temperature);
  console.log('sunrise: ', sunrise);
  console.log('sunset: ', sunset);
  console.log('precipitation_probability_max: ', precipitation_probability_max);
  console.log('uv: ', uv_index_max);
}

// Define the API URL
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=49.2606&longitude=123.246&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=America%2FLos_Angeles';

// Make a GET request using fetch
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })

  .then(data => {
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

    processData(temperatureData, precipitation, precipitation_probability, apparent_temperature, sunrise, sunset, precipitation_probability_max, uv_index_max);
  })

  .catch(error => {
    // Handle errors
    console.error('There was a problem with the fetch operation:', error);
  });


  
















  