
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

function displayForecast (){
  let forecastElement = document.querySelector("#forecast-weather");

  let forecastHTML = ``;
let days = ["Thu","Fri","Sat","Sun","Mon"];
days.forEach(function(day){
  forecastHTML = forecastHTML +  
  `
<table>
<tbody>
<tr>
 <td> ${day}</td>
      </tr>
      <tr>
        <td> <strong>16°c</strong> </td>
      </tr>
      <tr>
      <td> <i class="fa-solid fa-cloud icon"></i> </td>
      </tr>
      </tbody>
      </table>


`;

})



 forecastHTML = forecastHTML + ``;
   forecastElement.innerHTML = forecastHTML;

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

}

function weatherApi(city){
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}


function searchCity (event) {
event.preventDefault(); 
let city = document.querySelector("#placeSearch").value;
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
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector(".currentbar");
currentButton.addEventListener("click", currentLocation); 

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);



function showFahrenheitTemperature(event) {
  event.preventDefault();
   let temperatureElement = document.querySelector(".space");
   celciusLink.classList.remove("special-celcius");
   fahrenheitLink.classList.add("special-celcius");
  let fahrenheitTemperature = (celciusTemperature * 9)/ 5 +32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#faherenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelciusTemperature(event){
  event.preventDefault();
    let temperatureElement = document.querySelector(".space");
    celciusLink.classList.add("special-celcius");
      fahrenheitLink.classList.remove("special-celcius");
     temperatureElement.innerHTML = celciusTemperature;
}


let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);


weatherApi("Santiago");
displayForecast();