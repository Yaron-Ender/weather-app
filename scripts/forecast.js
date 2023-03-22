const APIkey = "Sf556YpF7AA3Xi8ekNgRg6aARYkkZyXq";

// get city information
const  getCity = async (city)=>{
    const base = `https://dataservice.accuweather.com/locations/v1/cities/search`;
    const query = `?apikey=${APIkey}&q=${city}`;
    const response = await fetch( `${base}${query}`);
    const data= await response.json()
    //data gives us array that consist a lot of obj, the first obj is the most accurate
    return data[0];
}

// get weather information
const getWeather = async(cityID)=>{
    const base = `https://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${cityID}?apikey=${APIkey}`;
const response = await fetch(`${base}${query}`)
const data = await response.json();
return data[0];
};

