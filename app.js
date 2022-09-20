const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "c87700dd4ef17264b805c1aa3c021339";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descriptionWeather = weatherData.weather[0].description;
      const sekil = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + sekil + "@2x.png";
      res.write("<p> condition: " + descriptionWeather + "</p>");
      res.write("<h1> Temperature in " + query + temp + " celcius degree</h1>");
      res.write("<img src =" + imgURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server 3000 portundan basladildi");
});
