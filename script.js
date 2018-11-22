var inputBox = document.getElementsByName("location")
var submit = document.querySelector("button")
var h2 = document.querySelector("h2")


submit.addEventListener("click", function(){
    var input = inputBox[0].value
    var apiCurrent = "http://api.apixu.com/v1/current.json?key=bf10e7e3ac4e48808c030519182211&q=" + input
    var apiForecast = "http://api.apixu.com/v1//forecast.json?key=bf10e7e3ac4e48808c030519182211&q=" + input + "&days=5"
    doThis(apiCurrent, apiForecast, input)
})


function doThis(apiCurrent, apiForecast, input){
fetch(apiCurrent).then(response => {
  return response.json();
}).then(currData => {
    currentTemp = currData.current.temp_f
    currentRain = currData.current.precip_in
    h2.innerHTML = "Weather for " + currData.location.name + ", " + currData.location.region

fetch(apiForecast).then(response => {
     return response.json();
}).then(foreData => {

    for(var i = 0; i < 5; i++){
        //adds dates and temps
        var dayId = document.getElementById("day" + (i + 1))
        dayId.innerHTML = foreData.forecast.forecastday[i].date + " " + "High " + foreData.forecast.forecastday[i].day.maxtemp_f

        //adds icons
        var img = document.createElement("img");
        img.src = "http:" + foreData.forecast.forecastday[i].day.condition.icon;
        dayId.appendChild(img);

}

})

}
);
}
