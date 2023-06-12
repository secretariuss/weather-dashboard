var date = dayjs();
console.log(date);
var actualWeather = $('#actual-weather');
var cardContainer = $('#card-container');
var APIKey = "810f728d770cc413c5291598e605e72a";
var searchCity = $("#search-city");
var card = $('.card');
var sCity = [];

// var cutterntDay = $('#currentDay');
var searchBtn = document.querySelector('.search-button');


var inputEl = document.querySelector('.search-city');

//var city = localStorage.getItem('cityNameStore');
var city = "";

function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (c === sCity[i]) {
      return -1;
    }
  }
  return 1;
}

var actualWeatherDiv = [
  '<h3 id="city" class="city-name mb-1 mt-2 me-2 bolder"></h3><p id="currentDay" class="lead"></p>',
  '<span id="weather-icon" class="mx-1"></span>',
  '<p>Temp: <span class="actual temp" id="temp"></span></p>',
  '<p>Wind: <span class="actual" id="wind"></span></p>',
  '<p>Humidity: <span class="actual" id="humidity"></span></p>',
]

// var forecastDivs = [
//   '<div id="card0" class="col-sm-2 bg-primary forecast text-white ml-2 mb-3 p-2 mt-2 rounded"></div>',
//   '<p id="date0"></p>',
//   '<p id="img0"></p>',
//   '<p>Temp:<span id="temp0"></span></p>',
//   '<p>Wind:<span id="wind0"></span></p>',
//   '<p>Humidity:<span id="humidity0"></span></p>',
// ]

var cardDivs = [
  '<p id="date"></p>',
  '<p id="icon"></p>',
  '<p>Temp: <span id="temp"></span></p>',
  '<p>Wind: <span id="wind"></span></p>',
  '<p>Humidity: <span id="humidity"></span></p>',
]

var showCurrentDay = function () {
  var date = dayjs();
  $('.lead').text('(' + date.format('DD/MM/YYYY') + ')');
}

// function setCityToLocalStorage() {
//   console.log("sdfdsafs");
//   localStorage.setItem('cityNameStore', inputEl.value);
//   getApi();
// }

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
    console.log(div);
    $(div).appendTo(this.actualWeather)
  }
}

function loadlastCity() {
  $("ul").empty();
  var sCity = JSON.parse(localStorage.getItem("cityNameStore"));
  if (sCity !== null) {
    sCity = JSON.parse(localStorage.getItem("cityNameStore"));
    for (i = 0; i < sCity.length; i++) {
      addToList(sCity[i]);
    }
    city = sCity[i - 1];
    getApi(city);
  }

}

function invokePastSearch(event) {
  var liEl = event.target;
  if (event.target.matches("li")) {
    city = liEl.textContent.trim();
    getApi(city);
  }

}

// function createCardDivs() {
//   for(x=0; x<5; x++) {
//     $("<div>", {
//       'id': "card",
//       'class': "col-sm-2 bg-primary forecast text-white me-2 mb-3 p-2 mt-2 rounded"}).appendTo(this.cardContainer)    
//     }
// }

function createCard0() {
  for (div of cardDivs) {
    $(div).appendTo(this.card)
  }
  // $("<div>", {
  //   'id': "card0",
  //   'class': "col-sm-2 bg-primary forecast text-white me-2 mb-3 p-2 mt-2 rounded",
  // }).appendTo(this.cardContainer)
  //   .append($("<p>"), {
  //     'id': "date0"
  //   })
  //   .append($("<p>"), {
  //     'id': "img0"
  //   })
  //   .append($("<p>")).append($("<span>", {
  //     'id': "temp0",
  //     'text': "Temp:"
  //   }))
  //   .append($("<p>")).append($("<span>", {
  //     'id': "wind0",
  //     'text': "Wind:"
  //   }))
  //   .append($("<p>")).append($("<span>", {
  //     'id': "humidity0",
  //     'text': "Humidity:"
  //   }))
}

// function saveInput() {

//   $('.saveBtn').on('click', function () {
//     var hours = $(this).parent().attr("id");
//     console.log(hours);
//     var textAreaValue = $(this).siblings('.description').val();
//     localStorage.setItem(hours, textAreaValue);
//     console.log(textAreaValue);
//   })

//   $("#hour-9 .description").val(localStorage.getItem("hour-9"));
//   $("#hour-10 .description").val(localStorage.getItem("hour-10"));
//   $("#hour-11 .description").val(localStorage.getItem("hour-11"));
//   $("#hour-12 .description").val(localStorage.getItem("hour-12"));
//   $("#hour-13 .description").val(localStorage.getItem("hour-13"));
//   $("#hour-14 .description").val(localStorage.getItem("hour-14"));
//   $("#hour-15 .description").val(localStorage.getItem("hour-15"));
//   $("#hour-16 .description").val(localStorage.getItem("hour-16"));
// }

function getApi(city) {
  // fetch request gets a list of all the repos for the node.js organization
  //var requestUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${51.5073219}&lon=${-0.1276474}&appid=${APIKey}`;
  var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.cod == 200) {
        sCity = JSON.parse(localStorage.getItem("cityNameStore"));
        console.log(sCity);
        console.log(JSON.parse(localStorage.getItem("cityNameStore")));
        if (sCity == null) {
          sCity = [];
          sCity.push(city);
          localStorage.setItem("cityNameStore", JSON.stringify(sCity));
          addToList(city);
        }
        else {
          if (find(city) > 0) {
            sCity.push(city);
            localStorage.setItem("cityNameStore", JSON.stringify(sCity));
            addToList(city);
          }
        }
      }
      $('.city-name').html("<h3>" + data.name + "</h3>");
      $('#weather-icon').html("<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png' >");
      $('#wind').text(data.wind.speed + " MPH");
      $('#humidity').text(data.main.humidity + "%");
      $("#temp").text(data.main.temp + " F");
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      var cityId = data.id;

      var queryforcastURL=`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${APIKey}`;
      fetch(queryforcastURL)
        .then((data) => data.json())
        .then(data => {
          var day0 = dayjs(data.list[0].dt_dtx);
          var day1 = dayjs(data.list[8].dt_txt);
          var day2 = dayjs(data.list[16].dt_txt);
          var day3 = dayjs(data.list[24].dt_txt);
          var day4 = dayjs(data.list[32].dt_txt);

          $('#card0 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Weather icon'>")
          $('#card1 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png' alt='Weather icon'>")
          $('#card2 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png' alt='Weather icon'>")
          $('#card3 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png' alt='Weather icon'>")
          $('#card4 #icon').html("<img src='https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png' alt='Weather icon'>")
          
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

      var queryURLUv = `http://api.openweathermap.org/data/2.5/uvi?&appid=${APIKey}&lat=${lat}&lon=${lon}`;
      fetch(queryURLUv)
        .then((g) => g.json())
        .then(c => console.log(c.value))
    })

}

// function getURL() {

//   var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey;
//   fetch(queryURLUv)
//   .then((response) => response.json())
//   .then((data) => {
//     var lat = data.coord.lat;
//     var lon = data.coord.lon;

//    console.log(lat, lon);
//     })
// }


// function getApi() {
//   var requestUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=${51.5073219}lon=4{-0.1276474}appid=810f728d770cc413c5291598e605e72a";

//   fetch(requestUrl)
//   .then((response) => response.json())
//   .then((data) => console.log(data))
// }

createCard0()
// createCard1()
// createCard2()
// createCard3()
// createCard4()
actualWeatherContent();

//getHours();
//getApi();
//createCardDivs();
showCurrentDay();

//searchBtn.addEventListener('click', setCityToLocalStorage);
$("#search-button").on("click", setCityToLocalStorage);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);