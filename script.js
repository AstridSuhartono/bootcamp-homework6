$(document).ready(function() {

    // declare variables and constant 
    var prevCity = "";
    var citiesArray = [];
    const APIkey = "4ee5795f0338dedf641f1c65d49e8b9c";
    const openweatherURL = "https://api.openweathermap.org/data/2.5/";

    init();

    function init(){
        var storedCities = JSON.parse(localStorage.getItem("cities"));
        prevCity = localStorage.getItem("prevCity");
        renderDate();
        if(storedCities !== null && prevCity !== null){
            citiesArray = storedCities;
            createApiCall(prevCity);

        }else{
            citiesArray = new Array();
            prevCity = "";
            storeCities();
        }
        renderSearchList()
    }

    //populate and format the date in the html page
    function renderDate(){
        // Show current day
        var today = moment().format('Do MMMM YYYY');
        $(".date0").text(today);
        let dayArray = []
        for (i = 1 ;  i < 5 ; i++){
            dayArray[i] = moment().add(i,'days').format('Do MMMM YYYY');
            $(".date"+i).text(dayArray[i]);
        }
       
    }

    //create a list of every city that the user search previously
    function renderSearchList(){
        $(".cities").empty();
        for(var i = 0; i < citiesArray.length; i++){
            var city = citiesArray[i];
            let cityListItem = $("<button>").addClass("btn btn-block btn-outline-light citylist").text(city);
            $(".cities").append(cityListItem);
        }
    }

    //function to populate detailed data for the today weather condition
    function populateWeatherDetail(response){
        $(".cityName").text(JSON.stringify(response.name)+" , "+JSON.stringify(response.sys.country));
        $(".cityTemp").text(JSON.stringify(response.main.temp)+"\xB0C");
        $(".cityFeelTemp").text(JSON.stringify(response.main.feels_like)+"\xB0C");
        $(".cityHumid").text(JSON.stringify(response.main.humidity)+"%");
        $(".cityWind").text(JSON.stringify(response.wind.speed)+" m/sec , " +JSON.stringify(response.wind.deg)+" \xB0");
        $(".cityWeather").text(JSON.stringify(response.weather[0].description));
        let iconCode = JSON.stringify(response.weather[0].icon);
        let iconURL = createWeatherIcon(iconCode);
        $(".cityIcon").attr("src", iconURL);

        let lat = response.coord.lat;
        let lon = response.coord.lon;

        var uvURL = openweatherURL+"uvi?appid="+APIkey+"&lat="+lat+"&lon="+lon;
        $.ajax({
            url: uvURL,
            method: "GET"
            }).then(function(response){
                let uvi = JSON.stringify(response.value);
                $(".cityUV").text(uvi);
                createUvLevel(uvi);
            });
    }

    //function to populate weather forecast into the card for the next 4 days
    function populateWeatherForecast(response){
        let index = 1;
        for (i = 8; i < 40; i = i + 8){
            $(".temp"+index).text(JSON.stringify(response.list[i].main.temp)+"\xB0C");
            $(".humidity"+index).text(JSON.stringify(response.list[i].main.humidity)+"%");
            let iconCode = JSON.stringify(response.list[i].weather[0].icon);
            let iconURL =  createWeatherIcon(iconCode);
            $(".card-img"+index).attr("src", iconURL);
            index ++;
        }  
    }

    //get the icon to show the weather conditions
    function createWeatherIcon(iconCode){
        clearIconCode = iconCode.slice(1, -1);
        let iconURL = "https://openweathermap.org/img/wn/"+clearIconCode+"@2x.png";
        return iconURL;
    }

    //set background colour for UV Index based on level of the UV 
    function createUvLevel(uvIndex){
        if (uvIndex >= 11){
            $(".uvLevel").text("EXTREME").css("background-color","#B705B7");
        }else if (uvIndex >= 8){
            $(".uvLevel").text("VERY HIGH").css("background-color","#F80101");
        }else if (uvIndex >= 6 ){
            $(".uvLevel").text("HIGH").css("background-color","#FC840C");
        }else if (uvIndex >= 3 ){
            $(".uvLevel").text("MODERATE").css("background-color","#FCFC0C");
        }else{
            $(".uvLevel").text("LOW").css("background-color","#108810");
        }
    }

    //Getting an AJAX call for the weather condition from the openweathermap API
    function createApiCall(city){
        let queryURL = openweatherURL+"weather?q="+city+"&units=metric&appid="+APIkey;
        var forecastURL = openweatherURL+"forecast?q="+city+"&units=metric&appid="+APIkey;
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(populateWeatherDetail);

        $.ajax({
            url: forecastURL,
            method: "GET"
            }).then(populateWeatherForecast);
    }

    //save searched cities into local storage
    function storeCities(){
        localStorage.setItem("cities", JSON.stringify(citiesArray));
    }

    //function that is called when user click the search button
    $("#submitBtn").on("click",function(event){
        event.preventDefault();
        if ($("#city").val() === ""){
            alert("City search cannot be empty. Please enter a city");
        }else{
            let city = $("#city").val().trim().toUpperCase();
            localStorage.setItem("prevCity",city);
            citiesArray.push(city);
            $("#city").val("");
            createApiCall(city);
            storeCities();
            renderSearchList();
        }
    })
    
    //function to populate weather condition based on a list of cities that has been searched by user
    $(document).on("click",".citylist",function(event){
        event.preventDefault();
        let city = $(this).text();
        console.log(city);
        localStorage.setItem("prevCity",city);
        createApiCall(city);
    })

    //clear the local storage and empty the city list text
    $("#clearBtn").on("click",function(event){
        event.preventDefault();
        $(".cities").empty();
        $("#city").val("");
        localStorage.clear();
        citiesArray = new Array();
        prevCity = "";
        storeCities();
    }) 
});