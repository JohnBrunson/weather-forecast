import dotenv from 'dotenv';
dotenv.config();

// Plaintext. What are we trying to accomplish:
// 1. user enters a city and presses the button.
// 2. button says, "Backend, fetch me data, here's the city."
//3. Back end takes city, passes it in to a url.
// 4. url asks for data for city for the five day forecast. (e.g.https://api.openweathermap.org/data/2.5/forecast?q=Portland&appid=16f05e1a011fbe76fdf9530aad354a4c)
// 5 Data returned is a large object. We want to get the data 

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  long: number;
  lat: number;
}

// TODO: Define a class for the Weather object
// JB NOTE: Front end expects city, date, icon, iconDescription, tempF, windSpeed, humidity
class Weather {
  city: string;
  date: string; // check this?
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(  city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number){
     this.city = city;
     this.date = date;
     this.icon = icon;
     this.iconDescription = iconDescription;
     this.tempF = tempF;
     this.windSpeed = windSpeed;
     this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
    baseURL: string;
    apiKey: string;
    cityName: string;
  
      constructor() {
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
        this.cityName = '';
      }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
// More details from Xpert Learning
//After setting up the properties, implement the fetchLocationData method. This method will be responsible for making the API call to get location data based on a query.

    try {
      const response = await fetch(
 //       `${this.baseURL}/data/2.5/forecast?q=${lat}&${lon}&appid=${this.apiKey}`
        `${this.baseURL}/geo/1.0/direct?q=${lat}&${lon}&appid=${this.apiKey}`      
      );
      if (!response.ok){
        throw new Error('Network response was not OK.')
      }
      const locationData = await response.json;
      console.log(locationData);
      return locationData;
    }catch (err){
      console.error(`ERROR: There was a problem with the fetch Location Data Method:`, err);
      return err;
    }
  }
  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    try {
      const { lat, long } = locationData;
      return { lat, long };
    }catch (err){
      console.error("ERROR: Error destructuring location data:", err);
    } 
  }
  
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${cityName}&appId=${this.apiKey}`
        const geocodeData = response.json;
        console.log(geocodeData);
        return geocodeData;
      )
    }catch (err) {
      console.log(`ERROR: From Geocode Query`, err)
    }
    return
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    try {
      const response = await fetch (
        `${this.baseURL}/data/2.5/forecast?q=${lat}&${lon}&appid=${this.apiKey}`
        const weatherData = response.json;
        console.log(weatherData);
        return weatherData
      )
    }catch (err) {
      console.log (`ERROR from Build Weather Query:`, err)
    }
    return
  }
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  //JB NOTE: This is the public function that is used by the program.
  // async getWeatherForCity(city: string) {
  //   this.cityName = city;
  //   try {
  //     const coordinates
      
  //   } catch (error) {
      
  //   }
  // }
}

export default new WeatherService();
