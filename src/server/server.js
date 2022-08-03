// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log("Server running");
  console.log(`running on localhost: ${port}`);
}

//GET request

// app.get("/all", (req, res) => {
//   res.send(projectData);
// });
app.get('/', function(req,res){
  res.sendFile('dist/index.html');
})

//POST ROUTE
app.post("/addInfo", (req, res) => {
  projectData = req.body;
  res.send({ message: "Info received" });
  console.log(req);
});
