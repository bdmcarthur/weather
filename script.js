var inputBox = document.getElementsByName("location");
var submit = document.querySelector("button");
var h2 = document.querySelector("h2");
var currentCondition = document.getElementById("description");
var hiddenClassCurr = document.querySelector(".current");
var hiddenClassFore = document.querySelectorAll(".day");
var apiKeyCurr = "http://api.apixu.com/v1/current.json?key=bf10e7e3ac4e48808c030519182211&q=";
var apiKeyFore = "http://api.apixu.com/v1//forecast.json?key=bf10e7e3ac4e48808c030519182211&q=";

getLocation()

//enter button listener
input.addEventListener("keyup", function(event) {
    console.log(input)
  event.preventDefault();
  if (event.keyCode === 13) {
    submit.click();
  }
});

//submit button listener
submit.addEventListener("click", function(){
    removeWeather();
    var input = inputBox[0].value
    var apiCurrent = apiKeyCurr + input
    var apiForecast = apiKeyFore  + input + "&days=5"
    getWeather(apiCurrent, apiForecast, input)

})

//gets current location and displays as default
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        h2.innerHTML = "Please enter a location.";
    }
}

function showPosition(position) {
    coordinates = position.coords.latitude + ", " + position.coords.longitude
    console.log(coordinates)
    if (coordinates.length > 0){
        apiCurrLat = apiKeyCurr + coordinates
        apiForeLat = apiKeyFore + coordinates + "&days=5"
        getWeather(apiCurrLat, apiForeLat)
    }
}

function getWeather(apiCurrent, apiForecast){
//get current data
fetch(apiCurrent).then(response => {
    return response.json();
}).then(currData => {
        var currentTemp = parseInt(currData.current.temp_f) + "℉";
        var currentCond = currData.current.condition.text;
        var currArr = [currentTemp, currentCond]
        hiddenClassCurr.style.visibility = "visible";
            for(var i =0; i < hiddenClassFore.length; i++){
                hiddenClassFore[i].style.visibility = "visible";
            }

        h2.innerHTML = currData.location.name + ", " + currData.location.region

        for(var i = 0; i < currArr.length; i++){
            var p = document.createElement("p");
            p.innerHTML =  currArr[i]
            currentCondition.appendChild(p);
            p.className = "p" + (i + 1);
        }

        //add icon
        var icon = document.getElementById("icon");
        var img = document.createElement("img");
        img.src = currData.current.condition.icon.slice(16);
        icon.appendChild(img)
        img.className = "imgCurrent";


//get forecast data
fetch(apiForecast).then(response => {
     return response.json();
}).then(foreData => {
    for(var i = 0; i < 5; i++){

        var dayId = document.getElementById("day" + (i + 1));
        var date = dateFormat(foreData.forecast.forecastday[i].date);
        var highTemp = "High: " + parseInt(foreData.forecast.forecastday[i].day.maxtemp_f) + " ℉";
        var lowTemp = "Low: " + parseInt(foreData.forecast.forecastday[i].day.mintemp_f) + " ℉";
        var cond = foreData.forecast.forecastday[i].day.condition.text;
        var conditionArr = [date, cond, highTemp, lowTemp]

        //adds data into separate paragraphs
        para(conditionArr);
        function para(conditionArr){
            for(var i=0; i < conditionArr.length; i++){
                var p = document.createElement("p");
                p.innerHTML =  conditionArr[i];
                dayId.appendChild(p);
                }
            }

        //adds icons
        var img = document.createElement("img");
        img.src = foreData.forecast.forecastday[i].day.condition.icon.slice(16);
        dayId.appendChild(img);

}
})});}

//removes all existing weather data when submit is clicked
function removeWeather(){
    h2.innerHTML = ""

    var p = document.querySelectorAll("p")
    for(var i = 0; i < p.length; i++){
    p[i].remove();
    }

    var img = document.querySelectorAll("img")
    for(var i = 0; i < img.length; i++){
    img[i].remove();
    }

    hiddenClassCurr.style.visibility = "hidden";
    for(var i =0; i < hiddenClassFore.length; i++){
        hiddenClassFore[i].style.visibility = "hidden";
    }
}

function dateFormat(date){
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8);;
    finalDate = month + "/" + day + "/" + year
    return finalDate
}
