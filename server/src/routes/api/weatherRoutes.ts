//front end sends a fetch request. This should return a valid JSON object to the front-end.
import { Router } from 'express';
import weatherService from '../../service/weatherService.js';
//import { resolveObjectURL } from 'buffer';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// TODO: POST Request with city name to retrieve weather data
// JB NOTE: Undo the underscores if you expect this work. :-)
router.post('/', async(req, res) => {
  // TODO: GET weather data from city name
try {
  const { cityName } = req.body;
  console.log (`Request Body received`)
  //console.log(`City name received as ${cityName}`);
  const weatherData = await weatherService.getWeatherForCity(cityName);
  return res.status(200).json(weatherData);

} catch (error) {
  console.log (`Error from POST Request in weatherRoutes:`, error);
  return res.status(500).json ({ error: `Failed to fetch weather data` })  ;
}
  // TODO: save city to search history

});

// TODO: GET search history
router.get('/history', async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
