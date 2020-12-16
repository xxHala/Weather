const key = 'f056211ce8781b6750716d0b5e12a1b2';
function weatherBallon(cityID) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${key}`)
    .then((resp) => resp.json()) // Convert data to json
    .then((data) => {
      console.log(data);
      drawWeather(data);
    })
    .catch(() => {
      // catch any errors
    });
}

function drawWeather(data) {
  const celcius = Math.round(parseFloat(data.main.temp) - 273.15);
  const fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);
  const description = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${description}.png`;

  document.querySelector('.temp').innerHTML = `${celcius}&deg;`;
  document.querySelector('.location').innerHTML = data.name;
  document.querySelector('.weather-icon').innerHTML = `<img src='${iconUrl}'>`;
}
window.onload = function () {
  weatherBallon(250441);
};
