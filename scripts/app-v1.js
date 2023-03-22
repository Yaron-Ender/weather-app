
const cityForm = document.querySelector(".form-weather");//the form(consist 3 elements)
const cityName =document.querySelector('.info>p')//the first p TAG in the info DIV
const showTemp = document.querySelector(".sapn-temp");//the TEMP that inside the span element
const weatherCondition = document.querySelector('.info small')//small TAG that specify the condition weather
const info = document.querySelector('.info')//the buttom box, consist 
const imgBox =document.querySelector('.image')//the central img box
const imgInfoBox =document.querySelector('.imgInfoBox')//info+img box
const weatherIcon = document.querySelector('.weather-icon')// the weather icon under the central img
// Function
const updateCity = async(cityName)=>{
    //cityDets return the an obj with the information of the city, the Key is a number that we supply to the getWeather async function  
    const cityDets = await findCity(cityName)
    console.log(cityDets.Key);
    //weater return the the weather object
    const weather = await getWeather(cityDets.Key);
      return {cityDets,weather}
}//end of updateCIty

// update the name of the chosen place in the UI

const updateUI = (obj)=>{
//destructure properties
const {cityDets,weather} = obj

    // const cityDets = obj.cityDets;
    // const weather = obj.weather;
    console.log(cityDets,weather);
    cityName.innerHTML = cityDets.EnglishName;
    weatherCondition.innerHTML = weather.WeatherText;

//at the begining i used defferent end point without celsius degree, so i had to  calculate by my self
    // const tempMax = obj.weather.Temperature.Maximum.Value;
    // const tempMin = obj.weather.Temperature.Minimum.Value;
    // const tempArr = [tempMax,tempMin];
    // const tempCellcius = tempArr.reduce((acc,curr)=>{
    //  return Math.round(((acc+=curr)/2)-32*5/9)
    // },0)
    // console.log(tempCellcius,weather)
    showTemp.innerHTML = weather.Temperature.Metric.Value;
    imgInfoBox.classList.remove("none");
// set the cenral img to day or night
let dayOrNight = (weather.IsDayTime)
  ? "./img/day-night/day.svg":"./img/day-night/night.svg"
   imgBox.firstElementChild.setAttribute("src",`${dayOrNight}`)
 
//set the icon weather
weatherIcon.style.backgroundImage = `url(./img/icons/${weather.WeatherIcon}.svg),linear-gradient(rgba(255,255,255,0.2),rgba(0,0,0,0.2))`;
};

//EVENTS
cityForm.addEventListener('submit',e=>{
    e.preventDefault();
    const cityName = cityForm.city.value.trim();
    updateCity(cityName)
    .then(data=>updateUI(data))
    //data is the obj we created
    .catch(err=>console.log(err)) 
    cityForm.reset()
})