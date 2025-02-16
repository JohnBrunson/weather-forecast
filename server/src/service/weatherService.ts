import dotenv from 'dotenv';
dotenv.config();

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
    city: string;
  
      constructor() {
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
        this.city = '';
        console.log('API_BASE_URL:', this.baseURL);
        console.log('API_KEY:', this.apiKey);
      }

  // TODO: Create buildWeatherQuery method. Here to build the weather query using coordinates.
  private buildWeatherQuery(coordinates: Coordinates): string {
    console.log (`Build Weather Query says: ${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${this.apiKey}`)
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${this.apiKey}`;
  }
  
  // TODO: Create fetchAndDestructureLocationData method. Appears to only here to call fetchLocationData and pass an argument of city
  private async fetchAndDestructureLocationData(query: string){
    //logging for troubleshooting:
    //const url = `${this.baseURL}/data/2.5/forecast?q=${query}&appid=${this.apiKey}`;
   // console.log('Fetching location data from URL:', url);
    try {
      const url = `${this.baseURL}/data/2.5/forecast?q=${query}&appid=${this.apiKey}`;
      console.log('Fetching location data from URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not OK. Status: ${response.status}`);
      }
      const data = await response.json();
      //console.log('Location data:', data);

      // Extract latitude and longitude from the response
      const { city: { coord: { lat, lon } } } = data;
      return { lat, long: lon };
    } catch (err) {
      console.error('ERROR: There was a problem with the fetchAndDestructureLocationData method:', err);
      throw err;
    }
  }
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) : Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) {
      throw new Error (`FETCH WEATHER DATA: Network response was not OK.`)
    }
    //console.log (`fetchWeatherData response.json`, await response.json());
    return await response.json();
  }
  
  // TODO: Build parseCurrentWeather method
    private parseCurrentWeather(response: any): Weather {
    //Uncomment if more troubleshooting is needed for this function.
      //console.log('Full response data:', response);
  
    // Ensure the response has the expected structure
    if (!response || !response.list || !response.list[0] || !response.city) {
      throw new Error('Invalid response format');
    }
  
    const currentWeatherData = response.list[0];
    const cityName = response.city.name;
  
    console.log(`parseCurrentWeather Data: ${cityName}, ${currentWeatherData.dt_txt}, ${currentWeatherData.weather[0].icon}, ${currentWeatherData.weather[0].description}, ${currentWeatherData.main.temp}, ${currentWeatherData.wind.speed}, ${currentWeatherData.main.humidity}`);
  
    return new Weather(
      cityName,
      currentWeatherData.dt_txt,
      currentWeatherData.weather[0].icon,
      currentWeatherData.weather[0].description,
      currentWeatherData.main.temp,
      currentWeatherData.wind.speed,
      currentWeatherData.main.humidity
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]): Weather[] {
    console.log (`Data being placed in the buildForecastArray for ${this.city}`)
    const filteredData = weatherData.filter(data => data.dt_txt.endsWith("00:00:00"));
    // ${data.weather[0].icon}, ${data.weather[0].description}, ${data.main.temp}, ${data.wind.speed}, ${data.main.humidity}
    const limitedData = filteredData.slice (0, 5);
    return limitedData.map(data => new Weather(
      this.city,
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
  async getWeatherForCity(cityName: string): Promise <Weather []>{
    console.log("Call has arrived. Starting fetchAndDestructureLocationData")
    const coordinates = await this.fetchAndDestructureLocationData(cityName);
    //console.log("Coordinates fetched:", coordinates);
    const weatherData = await this.fetchWeatherData(coordinates);
    console.log("Weather data fetched, moving to parsing current weather...");
    const currentWeather = this.parseCurrentWeather(weatherData);
    //console.log("Current weather parsed:", currentWeather);
    console.log ("Current Weather Parsed.")
    const forecastArray = this.buildForecastArray(weatherData.list);
    //console.log("Forecast array built:", forecastArray);
    console.log("Forecast Array Built.")
    return [currentWeather, ...forecastArray];
  }
}

export default new WeatherService();
