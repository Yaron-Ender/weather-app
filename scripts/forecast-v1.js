
const APIkey = "Sf556YpF7AA3Xi8ekNgRg6aARYkkZyXq";

// keyCode for tel aviv 215854
//http://dataservice.accuweather.com/locations/v1/cities/search

//get weather information
const getWeather = async(id)=>{
   const base = "http://dataservice.accuweather.com/currentconditions/v1/";
   const query = `${id}?apikey=${APIkey}`
  const weather =await fetch(base+query)
  const response =await weather.json()
 console.log(response[0]);
 return response[0]; 
}
 
//get city information- this is the main fetch, we lookig for a city and with the information we got we can go and find other featurs 
const findCity =async (city)=>{
    const base =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
      const query = `?apikey=${APIkey}&q=${city}`
    const response = await fetch(base+query);
     const data = await response.json()
     return data[0]
     //the data is a big array, the first item is the one with the important  information
}

// findCity(`manchester`).then((data) => {
//     console.log(data);
//     return getWeather(data[0].Key);
//   }).then((data) => console.log(data))
//   .catch((err) => console.log(err));

