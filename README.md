# bootcamp-homework6

## Weather Forecast Dashboard

### Brief Description

The weather dashboard will run in the browser and feature dynamically updated HTML and CSS to show the current day weather condition and forecast for the next 4 days based on a city.
A third party API is implemented for this application, which is [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities and [Moment.js](https://momentjs.com/) library to work with date and time.

### Link to the Project

* https://github.com/AstridSuhartono/bootcamp-homework6
* https://astridsuhartono.github.io/bootcamp-homework6/

### Video Recording

Click the following link to see the video demo: https://drive.google.com/file/d/1afH7QhUMcNhBX3lTzXpJyC45HmpTm6d6/view

### How to Start

**Basic Setup**

The application consist of index.html, script.js, and style.css. Bootstrap is applied to help create the layout of the html page. Jquery library also implemented to shorten the code needed. Lastly, third party APIs are employed, which consist of [Moment.js] and [OpenWeatherAPI]. 

**Usage Instructions**

The following is the instructions to use the application:
* Enter the city name that the user would like to show the weather information from.
* City search is in format of : {city's name} or {city's name , 2-letter country code (ISO3166)}. Example: London, GB or New York, US.
* The city that has been entered and searched will be shown in a list.
* Weather condition for cities that are in the list can be called back again by clicking on the city name button.
* Clear button will remove all the cities in the history list.
* If the user does not clear the history, the cities list will be retained even after the user closed their browser and when they open the website again the previous city weather information will be shown.


Notes for the information shown on the dashboard:
* UV Index shown is only for during 12.00pm condition. 
* The forecast for the next 4 days is only showing information at 12.00pm on the related day.

### Code Style

The application is build by following the common standard styling conventions while implementing 3rd party APIs. Indentation is implemented by using a "hanging paragraph" style. 
White spaces is implemented to enchance readibility. The naming convention in programming is adopted to help understand the source code.

### Authors

Author: Astrid Suhartono, 28th of March 2020.