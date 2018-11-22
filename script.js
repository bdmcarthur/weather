var inputBox = document.getElementsByName("location")
var submit = document.querySelector("button")
var h2 = document.querySelector("h2")
var currentCondition = document.getElementById("description")
var hiddenClassCurr = document.querySelector(".current")
var hiddenClassFore = document.querySelectorAll(".day")

//enter button listener
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    submit.click();
  }
});

//submit button listener
submit.addEventListener("click", function(){
    removeWeather();
    var input = inputBox[0].value
    var apiCurrent = "http://api.apixu.com/v1/current.json?key=bf10e7e3ac4e48808c030519182211&q=" + input
    var apiForecast = "http://api.apixu.com/v1//forecast.json?key=bf10e7e3ac4e48808c030519182211&q=" + input + "&days=5"
    getWeather(apiCurrent, apiForecast, input)

})

function getWeather(apiCurrent, apiForecast, input){
//get current data
fetch(apiCurrent).then(response => {
    return response.json();
}).then(currData => {
        var currentTemp = currData.current.temp_f + "℉";
        var cond = currData.current.condition.text;
        var currArr = [currentTemp, cond]
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
        img.src = "http:" + currData.current.condition.icon;
        icon.appendChild(img)
        img.className = "imgCurrent";


//get forecast data
fetch(apiForecast).then(response => {
     return response.json();
}).then(foreData => {
    for(var i = 0; i < 5; i++){

        //adds dates and temps
        var dayId = document.getElementById("day" + (i + 1))
        var date = foreData.forecast.forecastday[i].date
        var highTemp = "High: " + foreData.forecast.forecastday[i].day.maxtemp_f + " ℉"
        var lowTemp = "Low: " + foreData.forecast.forecastday[i].day.mintemp_f + " ℉"
        var cond = foreData.forecast.forecastday[i].day.condition.text;
        var conditionArr = [date, cond, highTemp, lowTemp]

        //adds conditions into separate paragraphs
        function para(conditionArr){
            for(var i=0; i < conditionArr.length; i++){
                var p = document.createElement("p");
                p.innerHTML =  conditionArr[i];
                dayId.appendChild(p);

                }}
                para(conditionArr);

        //adds icons
        var img = document.createElement("img");
        img.src = "http:" + foreData.forecast.forecastday[i].day.condition.icon;
        dayId.appendChild(img);

}
})});}

//removes all existing weather data when submit is clicked
function removeWeather(){
    var h2 = document.querySelector("h2")
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
