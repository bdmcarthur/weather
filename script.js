var inputBox = document.getElementsByName("location")
var submit = document.querySelector("button")
var h2 = document.querySelector("h2")


submit.addEventListener("click", function(){
    var input = inputBox[0].value
    var api = "http://api.apixu.com/v1/current.json?key=bf10e7e3ac4e48808c030519182211&q=" + input
    doThis(api, input)
})


function doThis(key, input){
fetch(key).then(response => {
  return response.json();
}).then(data => {
}).catch(err => {
  // Do something for an error here
});
}
