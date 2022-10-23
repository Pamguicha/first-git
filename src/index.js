
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





function showTemperature(response) {
    let h1 = document.querySelector(".space");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `${temperature}`;
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

weatherApi("Santiago");