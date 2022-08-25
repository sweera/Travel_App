/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=148f4dc0f989cfb31859a09b4509866d&units=imperial";
//GeoNames URl
//http://api.geonames.org/searchJSON?
//full url
//http://api.geonames.org/search?q={city}&fuzzy=0.8&maxRows=1&username=${geonamesAPIkey}

//WeatherBit Api
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//UI Elements
const date = document.getElementById("date");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const weatherholder = document.getElementById("weather");
const content = document.getElementById("content");
const holder = document.getElementById("entryHolder");
//Adding an event listener
document.getElementById("generate").addEventListener("click", generateInfo);

//Function called by event listener
function generateInfo(e) {
  e.preventDefault();
  const zipcode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  console.log(newDate);
  console.log(zipcode);
  console.log(feelings);
  if (zipcode !== "") {
    const weatherurl = baseURL + zipcode + apiKey;
    getWeatherData(weatherurl).then(function (data) {
      console.log(data);
      const temp = Math.round(data.main.temp - 273.15);
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      const city = data.name;
      const max = Math.round(data.main.temp_max - 273.15);
      const min = Math.round(data.main.temp_min - 273.15);
      const type = data.weather.map((param) => param.main);
      postData("/addInfo", {
        // temperature: data.temperature,
        // date: newDate,
        // feelings: feelings,
        newDate,
        temp,
        feelings,
        type,
        pressure,
        max,
        min,
        city,
        humidity,
        //main,
      })
        .then(() => getprojectData("/all")) //enter valid zipcode in text field
        .then(() => updateUI());
    });
  } else {
    alert("Please enter a valid zipcode!");
  }
}

//GET function to get API data
const getWeatherData = async (weatherurl) => {
  const res = await fetch(weatherurl);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
//Function to POST data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Function to get project data
const getprojectData = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    date.innerHTML = `<h4>Date: ${newDate}</h4>`;
    city.innerHTML = `<h2>City is ${allData.city}</h2>`;
    temp.innerHTML = `<p>The temperature is: ${allData.temp}°C, Maximum: ${allData.max}°C, Minimum: ${allData.min}°C</p>`;
    weatherholder.innerHTML = `<p>The weather is: ${allData.type}, pressure is: ${allData.pressure}, humidity is: ${allData.humidity}</p>`;
    content.innerHTML = `<p>Feelings: ${allData.feelings}</p>`;
  } catch (error) {
    console.log("error", error);
  }
};
