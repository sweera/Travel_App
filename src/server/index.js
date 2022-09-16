const dotenv = require("dotenv");
dotenv.config({path: ".env"});
var path = require("path");

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));


//GET request

// app.get("/all", (req, res) => {
//   res.send(projectData);
// });
app.get('/', function(req,res){
  res.sendFile('dist/index.html');
})

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server running");
  console.log(`running on localhost: ${port}`);
}
//********************GeoNames API********************/
projectData = {};
app.get("/apiRequest", (req, res)=>{
  console.log('GET successful')
  res.send(allData)
});
app.post("/apiRequest", async function(req, res){
  geonamesInfo = {}
  let geonamesApiKey = process.env.GEONAMES_API_KEY;
  console.log(`${geonamesApiKey}`);
  let city = req.body.geoInfo.Destination;
  console.log(`Destination chosen: ${city}`);
  const geonamesURL = "http://api.geonames.org/searchJSON?";
  const fullGeonamesURL = `${geonamesURL}q=${city}&fuzzy=0.8&maxRows=1&username=${geonamesApiKey}`;
  console.log(fullGeonamesURL);
  const newData = await fetch(encodeURI(fullGeonamesURL)).then(res => res.json());
  console.log(newData);
})
//*********************WeatherBit API*****************/
let weatherInfo = {}
let weatherApiKey = process.env.WEATHERBIT_API_KEY;
console.log(`${weatherApiKey}`);
//*********************Pixbay API********************/
let pixInfo = {}
let pixbayApiKey = process.env.PIXBAY_API_KEY;
console.log(`${pixbayApiKey}`);
//POST ROUTE
app.post("/addInfo", (req, res) => {
  projectData = req.body;
  res.send({ message: "Info received" });
  console.log(req);
});
