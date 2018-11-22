var inputBox = document.getElementsByName("location")
var submit = document.querySelector("button")
var h2 = document.querySelector("h2")
var currentCondition = document.getElementById("description")


submit.addEventListener("click", function(){
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
        currentTemp = currData.current.temp_f
        currentRain = currData.current.precip_in
        var cond = currData.current.condition.text
        currentCondition.innerHTML = cond;
        h2.innerHTML = "Weather for " + currData.location.name + ", " + currData.location.region
        console.log(currData.current.condition.icon)

        //add icon
        var icon = document.getElementById("icon");
        var img = document.createElement("img");
        img.src = "http:" + currData.current.condition.icon;
        icon.appendChild(img);

//get forecast data
fetch(apiForecast).then(response => {
     return response.json();
}).then(foreData => {
    for(var i = 0; i < 5; i++){
        //var conditionArr = [];
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
                console.log(conditionArr[i])
                }}
                para(conditionArr);

        //adds icons
        var img = document.createElement("img");
        img.src = "http:" + foreData.forecast.forecastday[i].day.condition.icon;
        dayId.appendChild(img);

}
})});}
