# CovidTracker

Simple REST API that return data regarding Covid-19 cases around the world.
This project was meant as a learning experience.
This REST API was deployed in heroku at: https://sleepy-coast-59266.herokuapp.com

#Endpoints

*/api/global*
Get global data regarding covid-19 cases such as total cases, recovered cases, and death cases.

*/api/countries*
Get data regarding covid-19 cases from individual contries.

*/country/:country*
- Where :country is the ISO of the country.
Get data regarding covid-19 cases from specific country states/provinces.
Some countries will not have the required data. Some countries that returns a valid response: United States, China, Canada, Australia.
