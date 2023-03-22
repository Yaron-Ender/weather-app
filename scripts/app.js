
const cityForm = document.querySelector('form');
const cardImg = document.querySelector('.image');
const info = document.querySelector('.info');
const img = document.querySelector('img')
const icon = document.querySelector('.weather-icon');

// local storage varibles
// let cityDets =JSON.parse(localStorage.getItem('cityDets'))
// let weather =JSON.parse(localStorage.getItem('weather'))

//FUNCTIONS

//update the UI
const upDateUI = (data)=>{
  //Destructure properties
  const { cityDets, weather } = data;
  // what this does is to go to data(the OBJ) and take from there the properties: cityDets and weather and restore them in varible with the same name(the varible must be with the same name of the property) it the same like:
  // const cityDets = data.cityDets
  // const weather = data.weather
  
  console.log(cityDets, weather);
  //update details template
  info.innerHTML = `
  <div class="weather-icon"></div>
  <p>${cityDets.EnglishName}</p>
  <small>${weather.WeatherText}</small>
  <div class="temp">
  <p>temp<span class="sapn-temp">${weather.Temperature.Metric.Value}
  </span><span class="span-celcius">&#8451;</span></p></div>
  `;
  //update the night/day icon and img
  //the icon doesn't work.
  
  let iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
  console.log(iconSrc);
  icon.style.backgroundImage = `url(${iconSrc}),linear-gradient(rgba(255,255,255,0.2),rgba(0,0,0,0.2))`;
  let dayOrNight = weather.IsDayTime
  ? "./img/day-night/day.svg"
  : "./img/day-night/night.svg";
  img.setAttribute("src", `${dayOrNight}`);
  //remove none class
  cardImg.parentElement.classList.remove("none");
  //set in localStorage
};
// uptade the city
const updateCity = async (city)=>{
  const cityDets = await getCity(city);
  const weather  =await getWeather(cityDets.Key)
  // cityDEts is an OBJ with the city details that we have been given
  return {
    cityDets,weather
  };
}
//up date the UI from local storage
const UIfromLocalStorage = (cityDets, weather) => {
  data = {cityDets,weather}
  upDateUI(data)
};
//EVENT
cityForm.addEventListener('submit',e=>{
  e.preventDefault();
  const city = cityForm.city.value.trim()
  cityForm.reset()
  updateCity(city).then(data=>upDateUI(data))
  .catch(err=>console.log(err));
  //for localStorage
  localStorage.setItem("city",city);
  
});
if(localStorage.getItem('city')){
  cityForLS =localStorage.getItem("city")
  updateCity(cityForLS).then(data=>upDateUI(data))
  .catch(err=>console.log(err));
}