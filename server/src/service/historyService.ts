// Will be used in historyService Routes
//import fs from "fs/promises";
// For the bonus question
//import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties

// class City {
//   id: number;
//   name: string;
//   constructor (id: number, name: string,){
//     this.id = id;
//     this.name = name;
//   }
// }
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the db.json file
  // JB NOTE: should return valid JSON.
  // private async read() {
    
  //   }

  // TODO: Define a write method that writes the updated cities array to the db.json file
  //JB NOTE: This array should be ready to be written
  // private async write(cities: City[]) {}

  // TODO: Define a getCities method that reads the cities from the db.json file and returns them as an array of City objects
  // JB Note: Create instances of the CITY class here. (Constructor, give me a new city.)
  // async getCities() {}

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // What are the get cities return value? Calls get cities. Create new instance of City class using params passed to it, push the created city to array, call the write method and update the JSON. (This will overwrite it.)
  // async addCity(city: string) {}

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
