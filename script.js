var slider = document.getElementById('slider');
var toggle = document.getElementById('toggle');

// Toggle functionality
toggle.addEventListener('click', () => {
    var isOpen = slider.classList.contains('slide-in');

    slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
});

// Load day or night mode
dayNightMode = () => {
  var date = new Date();
  var hour = date.getHours();

  if(hour >= 7 && hour < 19)
    document.body.style.background = 'linear-gradient(0.50turn, white, #33adff, white)';
  else
    document.body.style.background = 'linear-gradient(0.50turn, black, #33adff, black)';
}

window.addEventListener('load', dayNightMode);

// Load default weather
defaultWeather = () => {
  loadWeather('San Francisco, California');
};

window.addEventListener('load', defaultWeather);

// Event listener for click
document.getElementById("searchWeather").addEventListener("click", () => {
  const input = document.getElementById('input');
  if(input.value != "")
    loadWeather(input.value)
});

// Event listener for enter
document.getElementById("input").addEventListener("keydown", (event) => {
  if(event.key === "Enter"){
    const input = document.getElementById('input');
    if(input.value != "")
      loadWeather(input.value)
  }
});

// Request to the weather API
loadWeather = (input) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=16a2314e91b166c8c3c5b3c33539f22b`;
    
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else{
      return Promise.reject(response.status)
    } 
  })
  .then(data => displayWeather(data))
  .catch(error => alert('Error: ' + error + '\n\nFor better accuracy enter your city and full state name, for example, San Franscisco, California\n\nIf your in a country without states, you can enter your city and full country name, for example, Hong Kong, Japan'));
}
  
displayWeather = (data) => {
  document.getElementById("img").className = "";
  setImage(data);

  document.getElementById("degrees").className = "";
  document.getElementById("degrees").innerHTML = ((data.main.temp * 9/5) + 32).toFixed(0) + '&deg;<span style="font-size: 1rem;margin-top: -10px;">F</span>';
  
  document.getElementById('bar').className = "";
  document.getElementById("bar").textContent = "|";

  document.getElementById("city-name").className = "";
  document.getElementById("city-name").textContent = data.name;
  
  document.getElementById('description').className = "";
  document.getElementById("description").textContent = data.weather[0].description;

  setTimeout(function() {
    document.getElementById("img").classList.add("animatee");
    document.getElementById("degrees").classList.add("animatee");
    document.getElementById("bar").classList.add("animatee");
    document.getElementById("city-name").classList.add("animatee");
    document.getElementById("description").classList.add("animatee");
  }, 300);

  document.getElementById("input").value = '';
  dayNightMode();
}

// Set the weather image
setImage = (data) => {
  if(data.weather[0].main === "Clear"){
    document.getElementById("img").src = "sun.svg";
  }

  if(data.weather[0].main === "Snow"){
    document.getElementById("img").src = "snow.svg";
  }

  if(data.weather[0].main === "Thunderstorm"){
    document.getElementById("img").src = "thunderstorm.svg";
  }

  if(data.weather[0].main === "Drizzle" || 
    data.weather[0].main === "Mist" ||
    data.weather[0].main === "Smoke" ||
    data.weather[0].main === "Haze" ||
    data.weather[0].main === "Dust" ||
    data.weather[0].main === "Fog" ||
    data.weather[0].main === "Sand" ||
    data.weather[0].main === "Dust" ||
    data.weather[0].main === "Ash" ||
    data.weather[0].main === "Squall" ||
    data.weather[0].main === "Tornado"){
      document.getElementById("img").src = "drizzle.svg";
  }

  if(data.weather[0].main === "Clouds"){
    if(data.weather[0].description === "few clouds")
      document.getElementById("img").src = "few_clouds.svg";
    else
      document.getElementById("img").src = "overcast_clouds.svg";
  }

  if(data.weather[0].main === "Rain"){
      document.getElementById("img").src = "light_rain.svg";
  }    
}


