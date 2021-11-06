/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=148f4dc0f989cfb31859a09b4509866d";

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//UI Elements
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const holder = document.getElementById('entryHolder');
//Adding an event listener
document.getElementById("generate").addEventListener("click", generateInfo);

//Function called by event listener
function generateInfo(e) {
  e.preventDefault();
  const zipcode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  console.log(zipcode);
  console.log(feelings);
  if (zipcode !== "") {
    const weatherurl = baseURL + zipcode + apiKey;
    getWeatherData(weatherurl)
    .then(function (data) {
      console.log(data);
      //const temp = data.main.temp;
      postData('/addInfo', {
        // temperature: data.temperature,
        // date: newDate,
        // feelings: feelings,
        newDate,
        temp,
        feelings

      }).then(() => getprojectData("/all"))
    });
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
