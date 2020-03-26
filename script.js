$(document).ready(function() {

    var citiesArray = [];

    // Show current day
    var today = moment().format('Do MMMM YYYY');
    $(".date").text(today);
    
    init();

    function init(){
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        if(storedCities !== null){
            citiesArray = storedCities;
        }else{
            citiesArray = new Array();
            storeCities();
        }

        renderSearchList()
    }

    function cityQueryURL(){
        if ( $("#city") == null){
            $(".message").text() = "Please enter a city name"
        }else{
            var city = $("#city").val().trim();
        }
 
        let cityTypeURL = "https://api.openweathermap.org/data/2.5/weather?q="+city;
        let APIkey = "4ee5795f0338dedf641f1c65d49e8b9c";
        let queryURL = cityTypeURL+"&units=metric&appid="+APIkey;
        return queryURL;
    }
 
    function renderSearchList(){
        $(".cities").empty();

        for(var i = 0; i < citiesArray.length; i++){
            var city = citiesArray[i];
            var cityListItem = $("<li>").text(city);
            $(".cities").append(cityListItem);
        }
        

    }

    function populateWeatherDetail(response){
        console.log(response);
        $(".cityName").text(JSON.stringify(response.name));
        $(".cityTemp").text(JSON.stringify(response.main.temp));
        $(".cityHumid").text(JSON.stringify(response.main.humidity));
        $(".cityWind").text(JSON.stringify(response.wind.speed));

    }

    function storeCities(){
        localStorage.setItem("cities", JSON.stringify(citiesArray));
    }


    $("#submitBtn").on("click",function(event){
        event.preventDefault();
        let queryURL = cityQueryURL();

        let city = $("#city").val().trim().toUpperCase();
        citiesArray.push(city);
        $("#city").empty();

        storeCities();
        renderSearchList();
    
        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(populateWeatherDetail);

    })
    
   

});