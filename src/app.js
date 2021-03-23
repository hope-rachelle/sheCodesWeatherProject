//Get current time and format
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

//set time format for forecast
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
  let apiWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(`${apiWeather}`).then(showWeather);
}
//show weather for city search//
function showWeather(response) {
  document.querySelector("#city")
  .innerHTML = response.data.city.name;
  document.querySelector("#current-temp")
  .innerHTML = `${Math.round(response.data.list[0].main.temp)}°C`;
  document.querySelector("#real-feel")
  .innerHTML = `${Math.round(response.data.list[0].main.feels_like)}°C`;
  document.querySelector("#humidity")
  .innerHTML = `${Math.round(response.data.list[0].main.humidity)}`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.list[0].wind.speed);
  document.querySelector("#description").innerHTML = response.data.list[0].weather[0].description;
  document.querySelector("#fahrenheit").innerHTML = `${Math.round(((response.data.list[0].main.temp)* 9)/ 5 + 32)}℉`;  
  document.querySelector("#date-time").innerHTML = null
  document.querySelector("#first-hour-temp").innerHTML = `${Math.round(response.data.list[0].main.temp)}℃`;
    document.querySelector("#second-hour-temp").innerHTML = `${Math.round(response.data.list[1].main.temp)}℃`;
    document.querySelector("#third-hour-temp").innerHTML = `${Math.round(response.data.list[2].main.temp)}℃`;
    document.querySelector("#fourth-hour-temp").innerHTML = `${Math.round(response.data.list[3].main.temp)}℃`;
    document.querySelector("#fifth-hour-temp").innerHTML = `${Math.round(response.data.list[4].main.temp)}℃`;
    document.querySelector("#sixth-hour-temp").innerHTML = `${Math.round(response.data.list[5].main.temp)}℃`;
    document.querySelector("#two-hour").innerHTML = forecastHour(response.data.list[0].dt * 1000);
    document.querySelector("#four-hour").innerHTML = forecastHour(response.data.list[1].dt * 1000);
    document.querySelector("#six-hour").innerHTML = forecastHour(response.data.list[2].dt * 1000);
    document.querySelector("#eight-hour").innerHTML = forecastHour(response.data.list[3].dt * 1000);
    document.querySelector("#ten-hour").innerHTML = forecastHour(response.data.list[4].dt * 1000);
    document.querySelector("#twelve-hour").innerHTML = forecastHour(response.data.list[5].dt * 1000);
  let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
//city search//
document.querySelector(".current-city").addEventListener("submit", changeCity);

//Current Location weather//
function displayWeather(conditions) {
    let celcius = Math.round(conditions.data.list[0].main.temp);
    let realFeel = Math.round(conditions.data.list[0].main.feels_like);
    let fahrenheitTemp = (celcius * 9)/ 5 + 32;
    document.querySelector("#city").innerHTML = conditions.data.city.name;
    document.querySelector("#current-temp").innerHTML = `${celcius}℃`;
    document.querySelector("#fahrenheit").innerHTML = `${Math.round(fahrenheitTemp)}℉`;
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
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${conditions.data.list[0].weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
//Current Location log
function recievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "9b49b786c41ac06639af307d20e8207c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(displayWeather);
}
//Get Current Location upon load
navigator.geolocation.getCurrentPosition(recievePosition);

