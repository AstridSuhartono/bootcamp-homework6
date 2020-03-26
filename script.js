$(document).ready(function() {

    var citiesArray = [];
    const APIkey = "4ee5795f0338dedf641f1c65d49e8b9c";

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
        if ( $("#city").val() == null ){
        }else{
            var city = $("#city").val().trim();
        }
 
        let cityTypeURL = "https://api.openweathermap.org/data/2.5/weather?q="+city;
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
        $(".cityName").text(JSON.stringify(response.name)+" , "+JSON.stringify(response.sys.country));
        $(".cityTemp").text(JSON.stringify(response.main.temp));
        $(".cityHumid").text(JSON.stringify(response.main.humidity));
        $(".cityWind").text(JSON.stringify(response.wind.speed));

        let lat = response.coord.lat;
        let lon = response.coord.lon;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+APIkey+"&lat="+lat+"&lon="+lon;
        $.ajax({
            url: uvURL,
            method: "GET"
            }).then(function(response){
                console.log(response);
                $(".cityUV").text(JSON.stringify(response.value));
            });
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