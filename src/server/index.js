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
let geonamesApiKey = process.env.GEONAMES_API_KEY;
console.log(`${geonamesApiKey}`);
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
