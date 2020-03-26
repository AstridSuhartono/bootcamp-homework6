$(document).ready(function() {

    var cities = [];
    
    // Show current day
    var today = moment().format('Do MMMM YYYY');
    $(".date").text(today);
    

    function buildQueryURL(){
        let city = $("#city").val().trim();
        let cityTypeURL = "https://api.openweathermap.org/data/2.5/weather?q="+city;
        let APIkey = "4ee5795f0338dedf641f1c65d49e8b9c";
        let queryURL = cityTypeURL+"&units=metric&appid="+APIkey;
        return queryURL;
    }

    function createSearchList(){
        
        var cityListItem = $("<li>").val(city);
        $(".cities").append(cityListItem);

    }

    function populateWeatherDetail(response){
        console.log(response);
        $(".cityName").text(JSON.stringify(response.name));
        $(".cityTemp").text(JSON.stringify(response.main.temp));
        $(".cityHumid").text(JSON.stringify(response.main.humidity));
        $(".cityWind").text(JSON.stringify(response.wind.speed));
 

    }


    $("#submitBtn").on("click",function(event){
        event.preventDefault();
        var queryURL = buildQueryURL();
        createSearchList();
    
        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(populateWeatherDetail);

    })
    
   

});