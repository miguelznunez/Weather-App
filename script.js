const city_state = document.getElementById('city-state');

window.addEventListener('load', defaultWeather);

function defaultWeather(){
  city_state.value = 'San Francisco, California';
  loadWeather();
}

function loadWeather(){
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city_state.value+'&units=metric&appid=16a2314e91b166c8c3c5b3c33539f22b';

  fetch(url)

  .then(function(response){
    if(response.ok)
      return response.json();
    else
      alert('Error: ' + response.status + '\nTry to enter your city and full state name, for example, San Franscisco, California.');
  })

  .then(function(data){ 
    setImage(data);
    document.getElementById('degrees').innerHTML = ((data.main.temp * 9/5) + 32).toFixed(0) + '&deg;<span style="font-size: 1rem;margin-top: -10px;">F</span>';
    document.getElementById('city-name').innerHTML = data.name;
    document.getElementById('bar').innerHTML = ' | ';
    document.getElementById('description').innerHTML = data.weather[0].description;
    dayNightMode();
    city_state.value = '';
  });
}

function dayNightMode(){
  const date = new Date();
  const hour = date.getHours();

  if(hour >= 7 && hour < 19)
    document.body.style.background = 'linear-gradient(0.50turn, white, #66c2ff, white)';
  else
    document.body.style.background = 'linear-gradient(0.50turn, black, #66c2ff, black)';
}

function setImage(data){
  if(data.weather[0].main === "Clear"){
    document.getElementById("img").src = "01d.svg";
  }
  if(data.weather[0].main === "Snow"){
    document.getElementById("img").src = "13d.svg";
  }
  if(data.weather[0].main === "Thunderstorm"){
    document.getElementById("img").src = "11d.svg";
  }
  if(data.weather[0].main === "Drizzle"){
    document.getElementById("img").src = "09d.svg";
  }
  if(data.weather[0].main === "Mist" ||
    data.weather[0].main === "Smoke" ||
    data.weather[0].main === "Haze" ||
    data.weather[0].main === "Dust" ||
    data.weather[0].main === "Fog" ||
    data.weather[0].main === "Sand" ||
    data.weather[0].main === "Dust" ||
    data.weather[0].main === "Ash" ||
    data.weather[0].main === "Squall" ||
    data.weather[0].main === "Tornado"){
      document.getElementById("img").src = "50d.svg";
  }
  if(data.weather[0].main === "Clouds"){
    if(data.weather[0].description === "few clouds")
      document.getElementById("img").src = "02d.svg";
    if(data.weather[0].description === "scattered clouds")
      document.getElementById("img").src = "03d.svg";
    if(data.weather[0].description === "broken clouds")
      document.getElementById("img").src = "04d.svg";
    if(data.weather[0].description === "overcast clouds")
      document.getElementById("img").src = "04d.svg";
  }
  if(data.weather[0].main === "Rain"){
    if(data.weather[0].description === "light rain")
      document.getElementById("img").src = "10d.svg";
    if(data.weather[0].description === "moderate rain")
      document.getElementById("img").src = "10d.svg";
    if(data.weather[0].description === "heavy intensity rain")
      document.getElementById("img").src = "10d.svg";
    if(data.weather[0].description === "very heavy rain")
      document.getElementById("img").src = "10d.svg";
    if(data.weather[0].description === "extreme rain")
      document.getElementById("img").src = "10d.svg";
    if(data.weather[0].description === "freezing rain")
      document.getElementById("img").src = "13d.svg";
    if(data.weather[0].description === "light intensity shower rain")
      document.getElementById("img").src = "09d.svg";
    if(data.weather[0].description === "shower rain")
      document.getElementById("img").src = "09d.svg";
    if(data.weather[0].description === "heavy intensity shower rain")
      document.getElementById("img").src = "09d.svg";
    if(data.weather[0].description === "ragged shower rain")
      document.getElementById("img").src = "09d.svg";
  }
}

