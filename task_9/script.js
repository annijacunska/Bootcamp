import {fetchAPI} from './fetch.js';

let url = 'https://api.open-meteo.com/v1/forecast?';

let latitude = '56.946285';
let longitude = '24.105078';

let weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55:	'Dense drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Freezing Drizzle',
  80: 'Slight rain showers'
}

let weatherContainer = document.querySelector('.weather-stats');
let cardTemplate = weatherContainer.querySelector('.card.clone');

let urlRiga = url + 
  'latitude=' + latitude + 
  '&longitude=' + longitude + 
  '&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin';

fetchAPI(urlRiga, function (response) {
  displayDates(response);
});

function displayDates(response) {
  let days = Object.keys(response.daily.time).length;
  let tempUnit = ' ' + response.daily_units.temperature_2m_max;

  for(let i = 0; i < days; i++) {
    let dayCard = cardTemplate.cloneNode(true);
    dayCard.classList.remove('clone');
    weatherContainer.append(dayCard);
    dayCard.querySelector('h2').textContent = response.daily.time[i];
    dayCard.querySelector(' .stats .max').textContent = response.daily.temperature_2m_max[i] + tempUnit;
    dayCard.querySelector(' .stats .min').textContent = response.daily.temperature_2m_min[i] + tempUnit;
    dayCard.querySelector(' .stats .weatherCode').textContent = translateWheatherCode(response.daily.weathercode[i]);

  }
}

function translateWheatherCode(id) {
  return weatherCodes[id];
}