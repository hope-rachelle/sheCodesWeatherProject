let now = new Date()
let month = now.toLocaleDateString('default', { month: 'long' });
//let months = now.getMonth(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])];
//let month = months[now.getMonth()];
let weekDay = now.toLocaleDateString('default', { weekday: 'long' });
//let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
//let weekDay = days[now.getDay()];
let day = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;} 
document.querySelector("#date-time").innerHTML = `${weekDay}, ${month} ${day} ${hour}:${minute}` ;
let nextHour = `${hour += 2}`;
if (hour > 12) {
    nextHour = `${hour - 12}`; }
let hourCode = "pm";
if (hour < 12) {
    hourCode = "am"; }

document.querySelector("#two-hour").innerHTML = `${nextHour}${hourCode}`;
document.querySelector("#four-hour").innerHTML = `${nextHour}${hourCode}`;
document.querySelector("#six-hour").innerHTML = `${nextHour}${hourCode}`;
document.querySelector("#eight-hour").innerHTML = `${nextHour}${hourCode}`;
document.querySelector("#ten-hour").innerHTML = `${nextHour}${hourCode}`;
document.querySelector("#twelve-hour").innerHTML = `${nextHour}${hourCode}`;
function displayWeather(conditions) {
    console.log(conditions);
    let temp = Math.round(conditions.data.current.temp);
    document.querySelector("#current-temp").innerHTML = `🌡${temp}`;
    document.querySelector("#real-feel").innerHTML = Math.round(conditions.data.current.feels_like);
    document.querySelector("#humidity").innerHTML = conditions.data.current.humidity;
    document.querySelector("#wind").innerHTML = Math.round(conditions.data.current.wind_speed);
    document.querySelector("#first-hour-temp").innerHTML = `${Math.round(conditions.data.hourly[2].temp)}℃`;
    document.querySelector("#second-hour-temp").innerHTML = `${Math.round(conditions.data.hourly[4].temp)}℃`;
    document.querySelector("#third-hour-temp").innerHTML = `${Math.round(conditions.data.hourly[6].temp)}℃`;
    document.querySelector("#fourth-hour-temp").innerHTML = `${Math.round(conditions.data.hourly[8].temp)}℃`;
    document.querySelector("#fifth-hour-temp").innerHTML = `${Math.round(conditions.data.hourly[10].temp)}℃`;
    document.querySelector("#sixth-hour-temp").innerHTML = `${Math.round(conditions.data.hourly[12].temp)}℃`;
    

}
function recievePosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "9b49b786c41ac06639af307d20e8207c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(recievePosition);
