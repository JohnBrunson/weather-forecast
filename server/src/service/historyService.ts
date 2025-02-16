// Will be used in historyService Routes
import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';
// For the bonus question
// import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties

class City {
  id: number;
  name: string;
  constructor(id: number, name: string,) {
    this.id = id;
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private dbPath: string;
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.dbPath = path.join(__dirname, '/../../db/db.json')
  }

  // TODO: Define a read method that reads from the db.json file
  // JB NOTE: should return valid JSON.
  private async read(): Promise<City[]> {

    // Should read the file in.
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading the db.json file:', error)
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the db.json file
  //JB NOTE: This array should be ready to be written
  private async write(cities: City[]) {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(cities, null, 2))
    } catch (error) {
      console.error('Error writing to the db.json file:', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the db.json file and returns them as an array of City objects
  // JB Note: Create instances of the CITY class here. (Constructor, give me a new city.)
  async getCities(): Promise<City[]> {
    const cities = await this.read();
    return cities.map(city => new City(city.id, city.name))
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // What are the get cities return value? Calls get cities. Create new instance of City class using params passed to it, push the created city to array, call the write method and update the JSON. (This will overwrite it.)
  async addCity(cityName: string): Promise<void> {
    const cities = await this.getCities();
    // Check if the city already exists
    const cityExists = cities.some(city => city.name.toLowerCase() === cityName.toLowerCase());

    if (cityExists) {
      //console.log(`City "${cityName}" already exists in the search history.`);
      return;
    }
    const newCity = new City(cities.length + 1, cityName);
    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: number) {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
