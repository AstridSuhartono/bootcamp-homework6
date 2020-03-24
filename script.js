$(document).ready(function() {

    // Show current day
    var today = moment().format('Do MMMM YYYY');
    $(".date").text(today);
    
    var infoTypeURL = "https://api.openweathermap.org/data/2.5/weather?+q=";
    var APIkey = "4ee5795f0338dedf641f1c65d49e8b9c";
    var queryURL = infoTypeURL+"&units=metric&appid="+APIkey;

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
        console.log(queryURL);
        console.log(response);
        });

});