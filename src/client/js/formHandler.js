/* Global Variables */

//Function called by event listener
function handleSubmit(e) {
  e.preventDefault();
  let destination = document.getElementById("destination").value;
  console.log(destination);
  let geoInfo = {
    "Destination": destination,
  };
  if(Client.checkValidity(destination)){
    console.log("Form Submitted");
    const getInfo = fetch("http://localhost:8000/apiRequest", {
      method: "POST",
      mode: "cors",
      credentials:"same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({geoInfo}),
    })
    .then(res => res.json())
    .then(function(res){
      updateUI(res);
      console.log(geoInfo)
    });
  } else{
    alert("Failed");
  };
};
//Adding an event listener
let generate = document.getElementById("generate");
if(generate){
  generate.addEventListener("click", handleSubmit);
};

const findLength = () => {
  const d = new Date();
  const newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
  console.log(`Today is ${d}`);
  let start = new Date(document.getElementById("departure").value);
  let end = new Date(document.getElementById("return").value);
  console.log(`Departure: ${start} Return: ${end}`);

  //using getTime() function returns time in milliseconds
  let tripPeriod = (end.getTime() - start.getTime());
  let timeToDays = (1000 * 60 * 60 * 24);

  //finding days until trip starts
  let timeToTrip = (start.getTime() - d.getTime());
  let daysToTrip = Math.ceil(timeToTrip / timeToDays);

  let tripLength = Math.ceil(tripPeriod / timeToDays);

  if(tripLength >= 0 && tripLength <= 14 && daysToTrip >= 0){
    return `Your trip is ${tripLength} day (s)`
  } else{
    alert("Enter again")
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:8000/apiRequest");
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("coordinates").innerHTML = `Latitude: ${allData.lat}, Longitude: ${allData.lng}`;
    document.getElementById("location").innerHTML = `Location: ${allData.location}, ${allData.country}`;
    document.getElementById("lengthOfTrip").innerHTML = `${findLength()}`;
    document.getElementById("description").innerHTML = `Forecast: ${allData.description}`;
    document.getElementById("temperature").innerHTML = `High: ${allData.high}, Low: ${allData.low}`;
    document.getElementById("picUrl").innerHTML = `<img id = "pic" src = "${allData.picUrl}">`;
  }
  catch(error){
    console.log("error", error);
  }
}
export { handleSubmit, updateUI, findLength};
//   console.log(newDate);
//   console.log(zipcode);
//   console.log(feelings);
//   if (zipcode !== "") {
//     const weatherurl = baseURL + zipcode + apiKey;
//     getWeatherData(weatherurl).then(function (data) {
//       console.log(data);
//       const temp = Math.round(data.main.temp - 273.15);
//       const pressure = data.main.pressure;
//       const humidity = data.main.humidity;
//       const city = data.name;
//       const max = Math.round(data.main.temp_max - 273.15);
//       const min = Math.round(data.main.temp_min - 273.15);
//       const type = data.weather.map((param) => param.main);
//       postData("/addInfo", {
//         // temperature: data.temperature,
//         // date: newDate,
//         // feelings: feelings,
//         newDate,
//         temp,
//         feelings,
//         type,
//         pressure,
//         max,
//         min,
//         city,
//         humidity,
//         //main,
//       })
//         .then(() => getprojectData("/all")) //enter valid zipcode in text field
//         .then(() => updateUI());
//     });
//   } else {
//     alert("Please enter a valid zipcode!");
//   }
// };

//GET function to get API data
// const getWeatherData = async (weatherurl) => {
//   const res = await fetch(weatherurl);
//   try {
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// //Function to POST data
// const postData = async (url = "", data = {}) => {
//   const response = await fetch(url, {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   try {
//     const newData = await response.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// //Function to get project data
// const getprojectData = async (url) => {
//   const res = await fetch(url);
//   try {
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // Update UI
// const updateUI = async () => {
//   const request = await fetch("/all");
//   try {
//     const allData = await request.json();
//     console.log(allData);
//     date.innerHTML = `<h4>Date: ${newDate}</h4>`;
//     city.innerHTML = `<h2>City is ${allData.city}</h2>`;
//     temp.innerHTML = `<p>The temperature is: ${allData.temp}°C, Maximum: ${allData.max}°C, Minimum: ${allData.min}°C</p>`;
//     weatherholder.innerHTML = `<p>The weather is: ${allData.type}, pressure is: ${allData.pressure}, humidity is: ${allData.humidity}</p>`;
//     content.innerHTML = `<p>Feelings: ${allData.feelings}</p>`;
//   } catch (error) {
//     console.log("error", error);
//   }
// };
