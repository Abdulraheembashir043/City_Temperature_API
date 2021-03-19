const city = document.getElementById('user-input');
const btn = document.getElementById('generate');
const clear = document.getElementById('clear');
const display = document.querySelector('.display-result');
const title = document.getElementById('result-title');
const description = document.getElementById('description');
const image = document.querySelector('img');
const errMsg = document.getElementById('error');
const kelvin = document.querySelector('#kelvin');
const fahrenheit = document.querySelector('#fahrenheit');
const celsius = document.querySelector('#celsius');

city.focus();
let input;
btn.addEventListener('click', () => {
  input = city.value;
  fetchAPI(input);
})

clear.addEventListener('click', () => {
  update();
  city.value = '';
  errMsg.style.display = 'none';
})

function fetchAPI(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2b2b54c2024825996a3e29b19657b621`)
  .then((response) => response.json())
  .then((data) => {

    if(data.cod === 200) {

      if(cityName) {
        title.innerHTML = `${cityName.toUpperCase()} Temperature`;
      }

      display.style.display = 'block';
      errMsg.style.display = 'none';

      let val = data.main.temp;

      description.innerHTML = data.weather[0].main;
      image.src = `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
      
      kelvin.innerHTML = Math.floor(val) + ` &degK`;
      fahrenheit.innerHTML = Math.floor(9 / 5 * (val - 273) + 32) + ' &deg;F';
      celsius.innerHTML = Math.floor(val - 273.15) + ' &deg;C';
    } else if(data.cod === "404") {
      console.log('not correct');
      update();
      errMsg.style.display = 'block';
    }
  })
}

function update() {
  display.style.display = 'none';
  city.focus();
}

window.addEventListener('load', function() {
  city.value = '';
})