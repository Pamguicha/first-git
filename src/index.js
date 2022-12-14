
//buttonSearch = document.querySelector(".btn") ---> It's not necessary.
//Changing name of parameters to city make it work
function realHour(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  let ampm = hours >= 12 ? "PM" : "AM";

  return `${day} ${hours}:${minutes}${ampm}`;
}
let reloj = document.querySelector(".dayHour");
let currentTime = new Date();
reloj.innerHTML = realHour(currentTime);

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  
  return days[day];
}


function displayForecast(response){
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast-weather");

let forecastHTML = ``;

forecast.forEach(function(forecastDay, index){
  if (index < 5) {
  forecastHTML = forecastHTML +  
  `
<table>
<tbody>
<tr>
 <td> ${formatDay(forecastDay.dt)}</td>
      </tr>
      <tr>
        <td> <strong>${Math.round(forecastDay.temp.max)}°</strong> </td>
      </tr>
      <tr>
      <td> <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt = "" width ="62" </td>
      </tr>
      </tbody>
      </table>


`;
}

})

 forecastHTML = forecastHTML + ``;
forecastElement.innerHTML = forecastHTML;

}


function getForecast(coordinates){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
    let h1 = document.querySelector(".space");
    celciusTemperature = Math.round(response.data.main.temp);
    h1.innerHTML = `${celciusTemperature}`;
    let infoForecast = document.querySelector(".dayDay"); 
    infoForecast.innerHTML = `<strong>${response.data.weather[0].description}</strong>`;
    let wind = document.querySelector(".speedWind");
    wind.innerHTML = (response.data.wind.speed + "KM/H");
    let humidity = document.querySelector(".humidityNumber");
    humidity.innerHTML = (response.data.main.humidity + "%");
    let pressure = document.querySelector(".pressure");
    pressure.innerHTML = response.data.main.pressure;
    let namePlace = document.querySelector(".toptown");
    let country = response.data.sys.country;
    let metropolis = response.data.name.toUpperCase();
    let message = `${metropolis}, ${country}`;
    namePlace.innerHTML = message;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute("alt",response.data.weather[0].description );

  getForecast(response.data.coord); 

}

function weatherApi(city){
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}


function searchCity (event) {
event.preventDefault(); 
let city = document.querySelector("#placeSearch").value;
 celciusLink.classList.remove("special-celcius");
      fahrenheitLink.classList.add("special-faherenheit");
       fahrenheitLink.classList.remove("colour-faherenheit");
weatherApi(city);
}

function searchLocation(position){
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
axios.get(newUrl).then(showTemperature);  
}

function currentLocation(event) {
  event.preventDefault();
    celciusLink.classList.remove("special-celcius");
      fahrenheitLink.classList.add("special-faherenheit");
       fahrenheitLink.classList.remove("colour-faherenheit");
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector(".currentbar");
currentButton.addEventListener("click", currentLocation); 

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);



function showFahrenheitTemperature(event) {
  event.preventDefault();
   let temperatureElement = document.querySelector(".space");
 celciusLink.classList.add("special-celcius");
      fahrenheitLink.classList.remove("special-faherenheit");
       fahrenheitLink.classList.remove("colour-faherenheit");
  let fahrenheitTemperature = (celciusTemperature * 9)/ 5 +32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#faherenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelciusTemperature(event){
  event.preventDefault();
    let temperatureElement = document.querySelector(".space");
   
   celciusLink.classList.remove("special-celcius");
   fahrenheitLink.classList.add("special-faherenheit");
    fahrenheitLink.classList.remove("colour-faherenheit");
     temperatureElement.innerHTML = celciusTemperature;
}


let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);


weatherApi("Santiago");