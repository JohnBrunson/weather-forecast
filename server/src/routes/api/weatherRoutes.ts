//front end sends a fetch request. This should return a valid JSON object to the front-end.
import { Router } from 'express';
import weatherService from '../../service/weatherService';
//import { resolveObjectURL } from 'buffer';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// JB NOTE: Undo the underscores if you expect this work. :-)
router.post('/', async(req, res) => {
  // TODO: GET weather data from city name

try {
  const {cityName} = req.body;
  const weatherData = await weatherService.getWeatherForCity(cityName);
  res.json(weatherData);
} catch (error) {
  
}
  // TODO: save city to search history

});

// TODO: GET search history
router.get('/history', async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
