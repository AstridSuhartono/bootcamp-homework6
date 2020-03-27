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
 
    function renderSearchList(){
        $(".cities").empty();
        for(var i = 0; i < citiesArray.length; i++){
            var city = citiesArray[i];
            let cityListItem = $("<button>").addClass("btn btn-block btn-outline-light citylist").text(city);
            $(".cities").append(cityListItem);
        }
    }

    function populateWeatherDetail(response){
        //console.log(response);
        $(".cityName").text(JSON.stringify(response.name)+" , "+JSON.stringify(response.sys.country));
        $(".cityTemp").text(JSON.stringify(response.main.temp)+"\xB0C");
        $(".cityHiLowTemp").text(JSON.stringify(response.main.temp_max)+"\xB0C / "+JSON.stringify(response.main.temp_min)+"\xB0C")
        $(".cityHumid").text(JSON.stringify(response.main.humidity)+"%");
        $(".cityWind").text(JSON.stringify(response.wind.speed)+"meter/sec , " +JSON.stringify(response.wind.deg)+" degrees");
        $(".cityWeather").text(JSON.stringify(response.weather[0].description));
        let iconCode = JSON.stringify(response.weather[0].icon);
        //console.log(iconCode);
        createWeatherIcon(iconCode);

        let lat = response.coord.lat;
        let lon = response.coord.lon;

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid="+APIkey+"&lat="+lat+"&lon="+lon;
        $.ajax({
            url: uvURL,
            method: "GET"
            }).then(function(response){
                //console.log(response);
                let uvi = JSON.stringify(response.value)
                $(".cityUV").text(uvi);
                createUvLevel(uvi);
            });
    }

    function createWeatherIcon(iconCode){
        clearIconCode = iconCode.slice(1, -1);
        let iconURL = "https://openweathermap.org/img/wn/"+clearIconCode+"@2x.png"
        //console.log(iconURL);
        $(".cityIcon").attr("src", iconURL);
    }

    function createUvLevel(uvIndex){
        if (uvIndex >= 11){
            $(".uvLevel").text("EXTREME").css("background-color","#B705B7")
        }
        else if (uvIndex >= 8){
            $(".uvLevel").text("VERY HIGH").css("background-color","#F80101")
        }else if (uvIndex >=6 ){
            $(".uvLevel").text("HIGH").css("background-color","#FC840C")
        }else if (uvIndex >=3 ){
            $(".uvLevel").text("MODERATE").css("background-color","#FCFC0C")
        }else{
            $(".uvLevel").text("LOW").css("background-color","#108810")
        }
    }


    function storeCities(){
        localStorage.setItem("cities", JSON.stringify(citiesArray));
    }


    $("#submitBtn").on("click",function(event){
        event.preventDefault();
        if ($("#city").val() === null){
            alert("Please enter a city")
        }
        let city = $("#city").val().trim().toUpperCase();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+APIkey;

        citiesArray.push(city);
        $("#city").val("");
        storeCities();
        renderSearchList();
    
        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(populateWeatherDetail);

    })
    
    $("#clearBtn").on("click",function(event){
        event.preventDefault();
        $(".cities").empty();
        $("#city").val("");
        localStorage.clear();
        citiesArray = new Array();
        storeCities();
    }) 

    $(".citylist").on("click",function(event){
        event.preventDefault();
        let city = $(this).text();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+APIkey;

        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(populateWeatherDetail);

    })
    

});