const city = document.getElementById('user-input');
const btn = document.getElementById('generate');
const clear = document.getElementById('clear');
const display = document.querySelector('.display-result');
const title = document.getElementById('result-title');
const description = document.getElementById('description');
const image = document.querySelector('img');
const kelvin = document.querySelector('#kelvin');
const fahrenheit = document.querySelector('#fahrenheit');
const celsius = document.querySelector('#celsius');

city.focus();

btn.addEventListener('click', () => {
  if(city.value) {
    title.innerHTML = `${city.value.toUpperCase()} Temperature`;
  }
  fetchAPI(city.value);
})

clear.addEventListener('click', () => {
  display.style.display = 'none';
  city.value = '';
  city.focus();
  btn.style.marginBottom = '23px';
})

function fetchAPI(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2b2b54c2024825996a3e29b19657b621`)
  .then((response) => response.json())
  .then((data) => {

    let val = data.main.temp;

    description.innerHTML = data.weather[0].main;
    image.src = `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
    
    kelvin.innerHTML = Math.floor(val) + ` &deg;<br>Kelvin`;
    fahrenheit.innerHTML = Math.floor(9 / 5 * (val - 273) + 32) + ' &deg;<br>Fahrenheit';
    celsius.innerHTML = Math.floor(val - 273.15) + ' &deg;<br>Celsius';
  })
}