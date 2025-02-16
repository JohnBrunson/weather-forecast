//front end sends a fetch request. This should return a valid JSON object to the front-end.
import { Router } from 'express';
import weatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';
//import { resolveObjectURL } from 'buffer';
const router = Router();


// TODO: POST Request with city name to retrieve weather data
// JB NOTE: Undo the underscores if you expect this work. :-)
router.post('/', async(req, res) => {
  // TODO: GET weather data from city name
try {
  const { cityName } = req.body;
  console.log (`Request Body received`)
  //console.log(`City name received as ${cityName}`);
  const weatherData = await weatherService.getWeatherForCity(cityName);
  await historyService.addCity(cityName);
  return res.status(200).json(weatherData);

} catch (error) {
  console.log (`Error from POST Request in weatherRoutes:`, error);
  return res.status(500).json ({ error: `Failed to fetch weather data` })  ;
}

});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const cities = await historyService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.log(`Error from GET Request in weatherRoutes:`, error);
    return res.status(500).json({ error: `Failed to fetch search history` });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {   try {
  const { id } = req.params;
  await historyService.removeCity(Number(id));
  return res.status(200).json({ message: 'City removed from search history' });
} catch (error) {
  console.log(`Error from DELETE Request in weatherRoutes:`, error);
  return res.status(500).json({ error: `Failed to remove city from search history` });
}});

export default router;
