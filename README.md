# Weather Forecast

## Description
This project is meant to be an attempt to experiment with APIs and client/server architecture. This allows the user to review  five day forecast based on the city that is input. By default, this will use the "midnight" entries provided.

## Installation

The production version of the application is found [here](https://weather-forecast-3cqu.onrender.com) No installation is required for this.

If, however, you want to tinker with the repository, simply clone the repository and then run ```npm run start:dev```.

## Usage
![Picture of Weather Forecast](readme-images/weather-forecast.png)
The program allows the user to enter the city and the API will retrieve appropriate information on the back end, and send to the front end the data available for that day. In addition, cities will save appropriately and can be used or deleted from the history. If a duplicate city is entered, then it will not retain those. (Argument possibly could be made that duplicates should be saved if state were also used, but that is not how this is setup.)

## Credits

N/A

## License
License: [MIT](https://choosealicense.com/licenses/mit/)