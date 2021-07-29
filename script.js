const slider = document.getElementById('slider');
const toggle = document.getElementById('toggle');

// Toggle functionality
toggle.addEventListener('click', () => {
    let isOpen = slider.classList.contains('slide-in');
    slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
});

// Load day or night mode
dayNightMode = () => {
  let date = new Date();
  let hour = date.getHours();

  if(hour >= 7 && hour < 19)
    document.body.style.background = 'linear-gradient(0.50turn, white, #33adff, white)';
  else
    document.body.style.background = 'linear-gradient(0.50turn, black, #33adff, black)';
}

window.addEventListener('load', dayNightMode);

// Event listener for searching the weather on "click" of the button
document.getElementById("searchWeather").addEventListener("click", () => {
  const input = document.getElementById('input');
    loadWeather(input.value);
});

// Event listener for searching the weather on "keydown" of the enter key
document.getElementById("input").addEventListener("keydown", (event) => {
  if(event.key === "Enter")
    loadWeather(input.value);
});

// Load default weather location
defaultWeather = () => {
  loadWeather('San Francisco, California');
};

window.addEventListener('load', defaultWeather);

// Request to the weather API
loadWeather = (input) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=16a2314e91b166c8c3c5b3c33539f22b`;
    
  fetch(url)

  .then(response => {
    if(!response.ok) throw Error(response.statusText);
      return response.json();
   })

   .then(data => {
      document.querySelector("#isValid").textContent = "";
      displayWeather(data);
   })
   
   .catch(error => document.querySelector("#isValid").textContent = error);
}
  
displayWeather = (data) => {
  document.querySelector("#img").className = "";
  setImage(data);

  document.querySelector("#degrees").className = "";
  document.querySelector("#degrees").innerHTML = ((data.main.temp * 9/5) + 32).toFixed(0) + '&deg;<span style="font-size: 1rem;margin-top: -10px;">F</span>';
  
  document.querySelector("#bar").className = "";
  document.querySelector("#bar").textContent = "|";

  document.querySelector("#city-name").className = "";
  document.querySelector("#city-name").textContent = data.name;
  
  document.querySelector("#description").className = "";
  document.querySelector("#description").textContent = data.weather[0].description;

  setTimeout(function() {
    document.querySelector("#img").classList.add("animatee");
    document.querySelector("#degrees").classList.add("animatee");
    document.querySelector("#bar").classList.add("animatee");
    document.querySelector("#city-name").classList.add("animatee");
    document.querySelector("#description").classList.add("animatee");
  }, 300);

  document.querySelector("#input").value = '';
}

// Set the weather image
setImage = (data) => {
  if(data.weather[0].main === "Clear"){
    document.querySelector("#img").src = "sun.svg";
  }

  if(data.weather[0].main === "Snow"){
    document.querySelector("#img").src = "snow.svg";
  }

  if(data.weather[0].main === "Thunderstorm"){
    document.querySelector("#img").src = "thunderstorm.svg";
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
      document.querySelector("#img").src = "drizzle.svg";
  }

  if(data.weather[0].main === "Clouds"){
    if(data.weather[0].description === "few clouds")
      document.querySelector("#img").src = "few_clouds.svg";
    else
      document.querySelector("#img").src = "overcast_clouds.svg";
  }

  if(data.weather[0].main === "Rain"){
      querySelector("#img").src = "light_rain.svg";
  }    
}
