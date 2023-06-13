var date = dayjs();
var actualWeather = $('#actual-weather');
var cardContainer = $('#card-container');
var APIKey = "810f728d770cc413c5291598e605e72a";
var searchCity = $("#search-city");
var card = $('.card');
var cityNames = [];

var searchBtn = document.querySelector('.search-button');


var inputEl = document.querySelector('.search-city');

var city = "";

function find(c) {
  for (var i = 0; i < cityNames.length; i++) {
    if (c === cityNames[i]) {
      return -1;
    }
  }
  return 1;
}

var actualWeatherDiv = [
  '<h3 id="city" class="city-name mb-1 mt-2 me-2 bolder"></h3><p id="currentDay" class="current-date"></p>',
  '<span id="weather-icon" class="mx-1"></span>',
  '<p>Temp: <span class="actual temp" id="temp"></span></p>',
  '<p>Wind: <span class="actual" id="wind"></span></p>',
  '<p>Humidity: <span class="actual" id="humidity"></span></p>',
]

var cardDivs = [
  '<p id="date"></p>',
  '<p id="icon"></p>',
  '<p>Temp: <span id="temp"></span></p>',
  '<p>Wind: <span id="wind"></span></p>',
  '<p>Humidity: <span id="humidity"></span></p>',
]

var showCurrentDay = function () {
  var date = dayjs();
  $('.current-date').text('(' + date.format('DD/MM/YYYY') + ')');
}

function setCityToLocalStorage(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    getApi(city);
  }
}

function addToList(c) {
  $(".list-group").append("<li class='list-group-item'>" + c + "</li>");
}

function actualWeatherContent() {
  for (div of actualWeatherDiv) {
    $(div).appendTo(this.actualWeather)
  }
}

function loadlastCity() {
  $("ul").empty();
  var cityNames = JSON.parse(localStorage.getItem("cityNameStore"));
  if (cityNames !== null) {
    cityNames = JSON.parse(localStorage.getItem("cityNameStore"));
    for (i = 0; i < cityNames.length; i++) {
      addToList(cityNames[i]);
    }
    city = cityNames[i - 1];
    getApi(city);
  }
}

function invokePastSearch(event) {
  var listElement = event.target;
  if (event.target.matches("li")) {
    city = listElement.textContent.trim();
    getApi(city);
  }
}

function createCards() {
  for (div of cardDivs) {
    $(div).appendTo(this.card)
  }
}

function getApi(city) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 200) {
        cityNames = JSON.parse(localStorage.getItem("cityNameStore"));
        if (cityNames == null) {
          cityNames = [];
          cityNames.push(city);
          localStorage.setItem("cityNameStore", JSON.stringify(cityNames));
          addToList(city);
        }
        else {
          if (find(city) > 0) {
            cityNames.push(city);
            localStorage.setItem("cityNameStore", JSON.stringify(cityNames));
            addToList(city);
          }
        }
      }
      $('.city-name').html("<h3>" + data.name + "</h3>");
      $('#weather-icon').html("<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png' >");
      $('#wind').text(data.wind.speed + " MPH");
      $('#humidity').text(data.main.humidity + "%");
      $("#temp").text(data.main.temp + " F");

      var cityId = data.id;

      var queryforcastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${APIKey}`;
      fetch(queryforcastURL)
        .then((data) => data.json())
        .then(data => {
          var day0 = dayjs(data.list[0].dt_dtx);
          var day1 = dayjs(data.list[8].dt_txt);
          var day2 = dayjs(data.list[16].dt_txt);
          var day3 = dayjs(data.list[24].dt_txt);
          var day4 = dayjs(data.list[32].dt_txt);

          $('#card0 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Weather icon'>");
          $('#card1 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png' alt='Weather icon'>");
          $('#card2 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png' alt='Weather icon'>");
          $('#card3 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png' alt='Weather icon'>");
          $('#card4 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png' alt='Weather icon'>");
          $('#card0 #date').text(day0.format('DD/MM/YYYY'));
          $('#card1 #date').text(day1.format('DD/MM/YYYY'));
          $('#card2 #date').text(day2.format('DD/MM/YYYY'));
          $('#card3 #date').text(day3.format('DD/MM/YYYY'));
          $('#card4 #date').text(day4.format('DD/MM/YYYY'));
          $("#card0 #temp").text(data.list[0].main.temp + " F");
          $("#card1 #temp").text(data.list[1].main.temp + " F");
          $("#card2 #temp").text(data.list[2].main.temp + " F");
          $("#card3 #temp").text(data.list[3].main.temp + " F");
          $("#card4 #temp").text(data.list[4].main.temp + " F");
          $("#card0 #wind").text(data.list[0].wind.speed + " MPH");
          $("#card1 #wind").text(data.list[1].wind.speed + " MPH");
          $("#card2 #wind").text(data.list[2].wind.speed + " MPH");
          $("#card3 #wind").text(data.list[3].wind.speed + " MPH");
          $("#card4 #wind").text(data.list[4].wind.speed + " MPH");
          $("#card0 #humidity").text(data.list[0].main.humidity + " %");
          $("#card1 #humidity").text(data.list[1].main.humidity + " %");
          $("#card2 #humidity").text(data.list[2].main.humidity + " %");
          $("#card3 #humidity").text(data.list[3].main.humidity + " %");
          $("#card4 #humidity").text(data.list[4].main.humidity + " %");
        })
    })
}

createCards();
actualWeatherContent();
showCurrentDay();

$("#search-button").on("click", setCityToLocalStorage);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);