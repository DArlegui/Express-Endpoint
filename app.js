import express from 'express';
import { getCar, getCars, createCar } from './database.js';

const app = express();

app.get('/cars', async (req, res) => {
  const cars = await getCars();
  res.send(cars);
});

app.get('/cars/:id', async (req, res) => {
  const id = req.params.id;
  const car = await getCar(id);
  res.send(car);
});

app.post('/cars', async (req, res) => {
  const { name, model, year } = req.body;
  const car = await createCar(name, model, year);
  res.send(car);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server ready'));
