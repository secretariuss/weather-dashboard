var date = dayjs();
console.log(date);
var actualWeather = $('#actual-weather');
var cardContainer = $('#card-container');
var APIKey = "810f728d770cc413c5291598e605e72a";
var card = $('.card')

// var cutterntDay = $('#currentDay');
var searchBtn = document.querySelector('.search-button');


var inputEl = document.querySelector('.search-city');

var city = localStorage.getItem('cityNameStore');

var actualWeatherDiv = [
  '<h3 id="city" class="city-name mb-1 mt-2 me-2 bolder"></h3><p id="currentDay" class="lead"></p>',
  '<p id="weather-icon">',
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
  '<p id="date0"></p>',
  '<p id="img0"></p>',
  '<p>Temp:<span id="temp0"></span></p>',
  '<p>Wind:<span id="wind0"></span></p>',
  '<p>Humidity:<span id="humidity0"></span></p>',
]

  var showCurrentDay = function () {
    var date = dayjs();
    $('.lead').text('(' + date.format('DD/MM/YYYY') + ')');
  }

function setCityToLocalStorage() {
  localStorage.setItem('cityNameStore', inputEl.value);
}

function actualWeatherContent() {
  for (div of actualWeatherDiv) {
    console.log(div);
    $(div).appendTo(this.actualWeather)    
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
// function createCard1() {

//   $("<div>", {
//     'id': "card1",
//     'class': "col-sm-2 bg-primary forecast text-white me-2 mb-3 p-2 mt-2 rounded",
//   }).appendTo(this.cardContainer)
//     .append($("<p>"), {
//       'id': "date1"
//     })
//     .append($("<p>"), {
//       'id': "img1"
//     })
//     .append($("<p>")).append($("<span>", {
//       'id': "temp1",
//       'text': "Temp:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "wind1",
//       'text': "Wind:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "humidity1",
//       'text': "Humidity:"
//     }))
// }

// function createCard2() {

//   $("<div>", {
//     'id': "card2",
//     'class': "col-sm-2 bg-primary forecast text-white me-2 mb-3 p-2 mt-2 rounded",
//   }).appendTo(this.cardContainer)
//     .append($("<p>"), {
//       'id': "date2"
//     })
//     .append($("<p>"), {
//       'id': "img2"
//     })
//     .append($("<p>")).append($("<span>", {
//       'id': "temp2",
//       'text': "Temp:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "wind2",
//       'text': "Wind:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "humidity2",
//       'text': "Humidity:"
//     }))
// }

// function createCard3() {

//   $("<div>", {
//     'id': "card3",
//     'class': "col-sm-2 bg-primary forecast text-white me-2 mb-3 p-2 mt-2 rounded",
//   }).appendTo(this.cardContainer)
//     .append($("<p>"), {
//       'id': "date3"
//     })
//     .append($("<p>"), {
//       'id': "img3"
//     })
//     .append($("<p>")).append($("<span>", {
//       'id': "temp3",
//       'text': "Temp:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "wind3",
//       'text': "Wind:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "humidity3",
//       'text': "Humidity:"
//     }))
// }

// function createCard4() {

//   $("<div>", {
//     'id': "card4",
//     'class': "col-sm-2 bg-primary forecast text-white me-2 mb-3 p-2 mt-2 rounded",
//   }).appendTo(this.cardContainer)
//     .append($("<p>"), {
//       'id': "date4"
//     })
//     .append($("<p>"), {
//       'id': "img4"
//     })
//     .append($("<p>")).append($("<span>", {
//       'id': "temp4",
//       'text': "Temp:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "wind4",
//       'text': "Wind:"
//     }))
//     .append($("<p>")).append($("<span>", {
//       'id': "humidity4",
//       'text': "Humidity:"
//     }))
// }

//only for example always current hour
// function alwaysCurrentHour() {

//   $("<div>", {
//     'id': "hour-" + dayjs().get('hour'),
//     'class': "row time-block",
//   }).appendTo(this.container)
//     .append($("<div>", {
//       'text': date.format('h A').split(' ').join(''),
//       'class': "col-2 col-md-1 hour text-center py-3",
//     }))
//     .append($("<textarea>", {
//       'rows': "3",
//       'class': "col-8 col-md-10 description",
//     }))
//     .append($("<button>", {
//       'aria-label': "save",
//       'class': "btn saveBtn col-2 col-md-1",
//     }).append($("<i>", {
//       'class': "fas fa-save",
//       'aria-hidden': "true"
//     })))

//   saveInput();
// }

function getHours() {

  $('.time-block').each(function () {
    var hoursScheduler = $(this).attr("id").split("hour-")[1];
    console.log('currentHours  ', currentHours);
    console.log('hoursScheduler   ', hoursScheduler);
    if (hoursScheduler < currentHours) {
      $(this).addClass('past');
    } else if (currentHours == hoursScheduler) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }

  });


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

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  //var requestUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${51.5073219}&lon=${-0.1276474}&appid=${APIKey}`;
  var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

   fetch(queryURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    $('.city-name').html("<h3>" + data.name + "</h3>");
    $('#weather-icon').html("<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png' >");
    $('#wind').text(data.wind.speed + " MPH");
    $('#humidity').text(data.main.humidity + "%");
    $("#temp").text(data.main.temp + " F");
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var queryURLUv = `http://api.openweathermap.org/data/2.5/uvi?&appid=${APIKey}&lat=${lat}&lon=${lon}`;
    fetch(queryURLUv)
    .then((g)=> g.json())
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

getHours();
getApi();
//createCardDivs();
showCurrentDay();

searchBtn.addEventListener('click', setCityToLocalStorage);