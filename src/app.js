let now = new Date()
let month = now.toLocaleDateString('default', { month: 'long' });
//let months = now.getMonth(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])];
//let month = months[now.getMonth()];
let weekDay = now.toLocaleDateString('default', { weekday: 'long' });
//let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//let weekDay = days[now.getDay()];
let day = now.getDate();
let hour = now.getHours();
if (hour > 12) {
    hour = hour - 12;
}
let minute = now.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;} 
document.querySelector("#date-time").innerHTML = `${weekDay}, ${month} ${day} ${hour}:${minute}` ;

function forecastHour(time) {
    let hourIntervals = new Date(time);
    let hour = hourIntervals.getHours();
    let hourCode = "pm";
    if (hour < 12) {
    hourCode = "am"; }
    if (hour > 12) {
    hour = hour - 12;}
return `${hour}${hourCode}`;}

//change current city button//
function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city").value;
  let apiKey = "9b49b786c41ac06639af307d20e8207c";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(`${apiWeather}`).then(showWeather);
}
function showWeather(response) {
  document.querySelector("#city")
  .innerHTML = response.data.name;
  document.querySelector("#current-temp")
  .innerHTML = `${Math.round(response.data.main.temp)}°C`;
  document.querySelector("#real-feel")
  .innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  document.querySelector("#humidity")
  .innerHTML = `${Math.round(response.data.main.humidity)}`;
}
document.querySelector(".current-city").addEventListener("submit", changeCity);

function displayWeather(conditions) {
    console.log(conditions);
    let celcius = Math.round(conditions.data.list[0].main.temp);
    let realFeel = Math.round(conditions.data.list[0].main.feels_like);
    //let forecastHour = forecastHour(conditions.data.list[2].dt*1000);
    document.querySelector("#city").innerHTML = conditions.data.city.name;
    document.querySelector("#current-temp").innerHTML = `${celcius}℃`;
    document.querySelector("#description").innerHTML = conditions.data.list[0].weather[0].description;
    document.querySelector("#real-feel").innerHTML = `${realFeel}℃`;
    document.querySelector("#humidity").innerHTML = conditions.data.list[0].main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(conditions.data.list[0].wind.speed);
    document.querySelector("#first-hour-temp").innerHTML = `${Math.round(conditions.data.list[0].main.temp)}℃`;
    document.querySelector("#second-hour-temp").innerHTML = `${Math.round(conditions.data.list[1].main.temp)}℃`;
    document.querySelector("#third-hour-temp").innerHTML = `${Math.round(conditions.data.list[2].main.temp)}℃`;
    document.querySelector("#fourth-hour-temp").innerHTML = `${Math.round(conditions.data.list[3].main.temp)}℃`;
    document.querySelector("#fifth-hour-temp").innerHTML = `${Math.round(conditions.data.list[4].main.temp)}℃`;
    document.querySelector("#sixth-hour-temp").innerHTML = `${Math.round(conditions.data.list[5].main.temp)}℃`;
    document.querySelector("#two-hour").innerHTML = forecastHour(conditions.data.list[0].dt * 1000);
    document.querySelector("#four-hour").innerHTML = forecastHour(conditions.data.list[1].dt * 1000);
    document.querySelector("#six-hour").innerHTML = forecastHour(conditions.data.list[2].dt * 1000);
    document.querySelector("#eight-hour").innerHTML = forecastHour(conditions.data.list[3].dt * 1000);
    document.querySelector("#ten-hour").innerHTML = forecastHour(conditions.data.list[4].dt * 1000);
    document.querySelector("#twelve-hour").innerHTML = forecastHour(conditions.data.list[5].dt * 1000);
}
function recievePosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "9b49b786c41ac06639af307d20e8207c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(recievePosition);

function displayFahrenheit(event) {
    event.preventDefault();
    let fahrenheitTemp = (celcius * 9)/ 5 + 32;
    let fahrenheitFeel = (realFeel * 9)/ 5 + 32;
    let hourlyTemp = (forecastTemp * 9)/ 5 +32;
    document.querySelector("#current-temp").innerHTML = `${Math.round(fahrenheitTemp)}℉`;
    document.querySelector("#real-feel").innerHTML = `${Math.round(fahrenheitFeel)}℉`;
    document.querySelector("#first-hour-temp").innerHTML = `${Math.round(hourlyTemp)}℉`;
    document.querySelector("#second-hour-temp").innerHTML = `${Math.round(hourlyTemp)}℉`;
    document.querySelector("#third-hour-temp").innerHTML = `${Math.round(hourlyTemp)}℉`;
    document.querySelector("#fourth-hour-temp").innerHTML = `${Math.round(hourlyTemp)}℉`;
    document.querySelector("#fifth-hour-temp").innerHTML = `${Math.round(hourlyTemp)}℉`;
    document.querySelector("#sixth-hour-temp").innerHTML = `${Math.round(hourlyTemp)}℉`;
}
let celcius = null;
let realFeel = null;
let forecastTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);