window.addEventListener('DOMContentLoaded', (event) => {
  const date = new Date();
  let allDay;

  const dateMap = new Map();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[new Date().getDay()];

  /**
 * fetch data from openweathermap API
 * @param {*} void
 * @returns {*} data from api
 */
  function weatherfetch() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=amman&appid=aa73d3feb388d4f8c2e2bd8ce49977ab&units=metric')
      .then((resp) => resp.json())
      .then((data) => dataWeather(data));
  }

  /**
   * flitering  data given from API
   * @param {*} data
   * @returns [] array of filterd Da
   */
  function dataWeather(data) {
    let nowDate = date.getDate();
    for (let i = 0; i < 5; i++) {
      allDay = data.list.filter((item) => item.dt_txt.includes(`${date.getMonth() + 1}-${nowDate}`));
      nowDate++;
      dateMap.set(`Day${i + 1}`, allDay);
    }
    weatherDraw();
    // console.log(dateMap);
    return allDay;
  }
  /** data for 1week weather
 *
 *
 */
  function oneWeek(data) {
    let oneWeek = '';
    oneWeek = `<div class=card>  
    <span class=firstcard> ${Math.floor(value[0].main.temp)}&deg </span>
      <span> <img class="city-icon" src="http://openweathermap.org/img/w/${value[0].weather[0].icon}.png">
      </span>     </div>
   `;
  }
  /**
     * mapping data and pass it into another function to draw
     * @param {*} void
     * @returns {*} void
     */
  function weatherDraw() {
    for ([key, value] of (dateMap)) {
      bigSection(value);
    }
  }

  function draw(value) {
    let markup = '';
    for (let i = 0; i < value.length; i++) {
      const listIconUrl = `http://openweathermap.org/img/w/${value[i].weather[0].icon}.png`;
      markup += `<div class=card>
                  <span>${Math.floor(value[i].main.temp)}&deg</span>  
                  <span><img class="city-icon" src="${listIconUrl}"></span>
                </div>`;
    }

    return markup;
  }

  function bigSection(value) {
    const weatherDiv = document.createElement('DIV');
    weatherDiv.innerHTML = draw(value);
    weatherDiv.className = 'weather';
    document.body.appendChild(weatherDiv);
  }

  weatherfetch();
});

/*
const li = document.createElement('div');
      const hourDate = data.list[i].dt_txt;
      const fields = hourDate.split(' ');
      date = fields[1];
      const hour = date.split(':');
      const currentHour = hour[0];
      const AmOrPm = parseInt(currentHour) >= 12 ? 'Pm' : 'Am';
      hours = (parseInt(currentHour) % 12) || 12;

      console.log('hour-Now', hours + AmOrPm);
      celcius = Math.floor(data.list[i].main.temp);
      console.log('weather-day', celcius);

      const listDescription = data.list[i].weather[0].icon;
      const listIconUrl = `http://openweathermap.org/img/w/${value[i].weather[0].icon}.png`;

      markup = `
    <div class="city-card">
            <div class="city-temp">${celcius}&deg</div>
          <img class="city-icon" src="${listIconUrl}">
         <div class="current-time">
         ${hours}:00
         <div class="am-or-pm">${AmOrPm}</div>
     </di>
        </div>
      `;
      document.querySelector('.cities').appendChild(li);
      li.innerHTML = markup;
    }
    for (let i = 4; i <= 36; i++) {
      document.querySelector('.current-temp').innerHTML = `${celcius}&deg;`;
      document.querySelector('.location').innerHTML = `${Country},${City}`;
      document.querySelector('.current-weather-icon').innerHTML = `<img src='${iconUrl}'>`;
      //  for (let i = 1; i < data.list.length - 35; i++)
    }
  }
*/
