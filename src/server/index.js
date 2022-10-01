const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
var path = require("path");

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("dist"));

//GET request

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// Setting up the Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server running");
  console.log(`running on localhost: ${port}`);
}
//Mock API Response
app.get('/test', function(req,res){
  res.send(mockAPIResponse)
})
//********************GeoNames API********************/
projectData = {};

app.get("/apiRequest", (req, res) => {
  console.log("GET successful");
  res.send(allData);
});

app.post("/apiRequest", async function (req, res) {
  geonamesInfo = {};
  let geonamesApiKey = process.env.GEONAMES_API_KEY;
  //console.log(`${geonamesApiKey}`);
  let city = req.body.geoInfo.Destination;
  console.log(`Entered city: ${city}`);
  const geonamesURL = "http://api.geonames.org/searchJSON?";
  const fullGeonamesURL = `${geonamesURL}q=${city}&fuzzy=0.8&maxRows=1&username=${geonamesApiKey}`;
  console.log(fullGeonamesURL);
  const newData = await fetch(encodeURI(fullGeonamesURL)).then((res) =>
    res.json()
  );
  console.log(newData);
  //Object to store geonames data
  let geoData = {
    location: newData.geonames[0].toponymName,
    country: newData.geonames[0].countryName,
    lat: newData.geonames[0].lat,
    lng: newData.geonames[0].lng,
  };
  geonamesInfo = geoData;

  //*********************WeatherBit API*****************/
  let weatherInfo = {};
  let weatherApiKey = process.env.WEATHERBIT_API_KEY;
  //console.log(`${weatherApiKey}`);
  const weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?`;
  const fullweatherbitURL = `${weatherbitURL}lat=${geonamesInfo.lat}&lon=${geonamesInfo.lng}&key=${weatherApiKey}`;
  console.log(fullweatherbitURL);
  const weatherbitInfo = await fetch(fullweatherbitURL).then((res) =>
    res.json()
  );
  console.log(weatherbitInfo);
  //Object to store weatherbit data
  let weatherbitData = {
    description: weatherbitInfo.data[0].weather.description,
    high: weatherbitInfo.data[0].high_temp,
    low: weatherbitInfo.data[0].low_temp,
  };
  weatherInfo = weatherbitData;
  console.log(weatherInfo);
  //*********************Pixbay API********************/
  let pixInfo = {};
  const pixbayApiKey = process.env.PIXBAY_API_KEY;
  const pixbayURL = `https://pixabay.com/api/?`;
  const fullpixbayURL = `${pixbayURL}key=${pixbayApiKey}&q=${geonamesInfo.location}&image_type=photo`;
  console.log(fullpixbayURL);
  const photoData = await fetch(fullpixbayURL).then((res) => res.json());
  console.log(photoData);
  console.log(`${pixbayApiKey}`);

  //response from all APIs are combined into a single object to send to client-side
  let location = geonamesInfo.location;
  let country = geonamesInfo.country;
  let lat = geonamesInfo.lat;
  let lng = geonamesInfo.lng;
  let description = weatherInfo.description;
  let high = weatherInfo.high;
  let low = weatherInfo.low;
  let picUrl = {};

  if (photoData.totalHits == 0) {
    picUrl =
      "https://pixabay.com/illustrations/sign-sorry-character-figure-1719892/";
  } else {
    picUrl = photoData.hits[0].webformatURL;
  }
  //stores info to be posted on client-side
  allData = {
    location,
    country,
    lat,
    lng,
    description,
    high,
    low,
    picUrl,
  };

  try {
    console.log("Data:", allData);
    res.send(allData);
    console.log("APIs successful");
  } catch (error) {
    alert("ERROR");
  }
});
//POST ROUTE
// app.post("/addInfo", (req, res) => {
//   projectData = req.body;
//   res.send({ message: "Info received" });
//   console.log(req);
