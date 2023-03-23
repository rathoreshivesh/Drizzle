const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Monday', 'Tuesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = 'eca98e20f7dc946e54267b31696bf0b1';

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minute = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  timeEl.innerHTML = hoursIn12HrFormat + ':' + minute + ' ' + `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + ' ' + months[month];
}, 1000);

getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let {feels_like,temp_max,temp_min,humidity, pressure} = data.main;
  currentWeatherItemsEl.innerHTML = `
  <div class="weather-item">
    <div>Feels Like</div>
    <div>${feels_like}</div>
  </div>
  <div class="weather-item">
    <div>Max Temp</div>
    <div>${temp_max}</div>
  </div>
  <div class="weather-item">
    <div>Min Temp</div>
    <div>${temp_min}</div>
  </div>
    <div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}</div>
    </div>
  `;

}
