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
  private async fetchLocationData(query: string): Promise<Coordinates>{
// More details from Xpert Learning
//After setting up the properties, implement the fetchLocationData method. This method will be responsible for making the API call to get location data based on a query.
  const response = await fetch(`${this.baseURL}/geocode?q=${query}&appid=${this.apiKey}`);
  const data = await response.json();
  return this.destructureLocationData(data);
// original attempt
//     try {
//       const response = await fetch(
//  //       `${this.baseURL}/data/2.5/forecast?q=${lat}&${lon}&appid=${this.apiKey}`
//         `${this.baseURL}/geo/1.0/direct?q=${lat}&${lon}&appid=${this.apiKey}`      
//       );
//       if (!response.ok){
//         throw new Error('Network response was not OK.')
//       }
//       const locationData = await response.json;
//       console.log(locationData);
//       return locationData;
//     }catch (err){
//       console.error(`ERROR: There was a problem with the fetch Location Data Method:`, err);
//       return err;
//     }
  }
  
  // TODO: Create destructureLocationData method. Seems its only job is to return latitude/Longitude data.
  private destructureLocationData(locationData: any): Coordinates {
    console.log (`Location Data -- Latitude: ${locationData[0].lat}`)
    console.log (`Location Data -- Latitude: ${locationData[0].lon}`)
    return {
      lat: locationData[0].lat,
      long: locationData[0].lon,
    };
    // try {
    //   const { lat, long } = locationData;
    //   return { lat, long };
    // }catch (err){
    //   console.error("ERROR: Error destructuring location data:", err);
    // } 
  }
  
  // TODO: Create buildGeocodeQuery method. Literally only here to make a geocode query.
  // private buildGeocodeQuery(city: string): string {
    
  // //   try {
  // //     const response = await fetch(
  // //       `${this.baseURL}/geo/1.0/direct?q=${cityName}&appId=${this.apiKey}`
  // //       const geocodeData = response.json;
  // //       console.log(geocodeData);
  // //       return geocodeData;
  // //     )
  // //   }catch (err) {
  // //     console.log(`ERROR: From Geocode Query`, err)
  // //   }
  // //   return
  // // }
  // return `${this.baseURL}/geocode?q=${city}&appid=${this.apiKey}`;
  // }

  // TODO: Create buildWeatherQuery method. Here to build the weather query using coordinates.
  private buildWeatherQuery(coordinates: Coordinates): string {
    // try {
    //   const response = await fetch (
    //     `${this.baseURL}/data/2.5/forecast?q=${lat}&${lon}&appid=${this.apiKey}`
    //     const weatherData = response.json;
    //     console.log(weatherData);
    //     return weatherData;
    //   )
    // }catch (err) {
    //   console.log (`ERROR from Build Weather Query:`, err)
    // }
    // return
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${this.apiKey}`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method. Appears to only here to call fetchLocationData and pass an argument of city
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates>{
    const locationData = await this.fetchLocationData(city);
    console.log(`fetchAndDestructureLocationData method --  Location Data: ${locationData}`)
    return locationData;
  }
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) : Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    console.log (`fetchWeatherData response.json ${response.json}`);
    return await response.json();
  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    console.log (`parseCurrentWeather Data: ${response.name}, ${response.dt_txt}, ${response.weather[0].icon}, ${response.weather[0].description}, ${response.main.temp},${response.wind.speed}, ${response.main.humidity}`);
    return new Weather(
      response.name,
      response.dt_txt,
      response.weather[0].icon,
      response.weather[0].description,
      response.main.temp,
      response.wind.speed,
      response.main.humidity
    );
  }
  
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]): Weather[] {
    console.log (`Data being placed in the buildForecastArray for ${this.cityName}`)
    // ${data.weather[0].icon}, ${data.weather[0].description}, ${data.main.temp}, ${data.wind.speed}, ${data.main.humidity}
    return weatherData.map(data => new Weather(
      this.cityName,
      data.dt_txt,
      data.weather[0].icon,
      data.weather[0].description,
      data.main.temp,
      data.wind.speed,
      data.main.humidity
    ));
  }
  
  // TODO: Complete getWeatherForCity method
  //JB NOTE: This is the public function that is used by the program.
  async getWeatherForCity(city: string): Promise <Weather []>{
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData.list);
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
