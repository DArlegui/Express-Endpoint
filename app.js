import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.use(async function (req, res, next) {
  try {
    //Acquire a connection from the pool
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    // Set the SQL mode to "TRADITIONAL" for strict SQL mode
    await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    await req.db.query(`SET time_zone = '-8:00'`);

    next(); // Call the next middleware or route handler in the chain

    // Release the database connection back to the pool after the request is processed
    req.db.release();
  } catch (err) {
    // Handle errors that occurred during the middleware execution
    console.log(err);
    // If a database connection was acquired, release it to avoid connection leaks
    if (req.db) req.db.release();
    // Propagate the error to the error-handling middleware
    throw err;
  }
});

/* Handlebar Middleware */
import { engine } from 'express-handlebars'; //Found fix
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json()); // Body Parser Middleware
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    // Execute a SQL query to retrieve cars from the database
    const [cars] = await req.db.query(`SELECT * FROM car WHERE deleted_flag = 0`);

    // Render the 'index' template and pass the 'data' variable
    res.render('index', {
      title: 'Car App',
      data: cars, // Pass the retrieved cars to the template
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

/* A middleware function that logs the request method and path to the console. */
// app.use(async function (req, res, next) {
//   try {
//     console.log('Middleware after the get /cars');
//     next();
//   } catch (err) {
//     res.json({ success: false, message: err.message, data: null });
//   }
// });

/* 
  A middleware function provided by the cors package. CORS stands for Cross-Origin Resource Sharing, and it is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page.

  CORS middleware to all routes in your Express application. This allows your server to respond to requests from different origins, which is important when your frontend    (client-side code) is served from a different domain or port than your backend.  
*/
app.use(cors());
/* 
A built-in middleware in Express. It parses incoming requests with JSON payloads. When a client sends a request with a JSON body, this middleware parses the JSON data and makes it available in the req.body object.

By using app.use(express.json()), you are telling your Express application to use the JSON parsing middleware for all incoming requests. This is particularly useful when you expect clients to send JSON data in the request body, for example, when handling POST or PUT requests.
*/
app.use(express.json());

app.get('/cars', async (req, res) => {
  try {
    // Execute a SQL query to retrieve cars from the database
    const [cars] = await req.db.query(`SELECT * FROM car WHERE deleted_flag = 0`);

    // Send a JSON response with the retrieved cars
    res.status(200).json({ success: true, message: 'Cars successfully retrieved', data: cars });
  } catch (err) {
    // Handle errors that may occur during the execution of the try block
    res.status(400).json({ success: false, message: 'Bad request', data: null });
  }
});

app.get('/cars/:id', async function (req, res) {
  try {
    const carId = req.params.id;
    const [car] = await req.db.query('SELECT * FROM car WHERE id = ?', [carId]);

    if (car.length === 0) {
      res.status(404).json({ success: false, message: 'Car not found', data: null });
    } else {
      res.status(200).json({ success: true, message: 'Car retrieved successfully', data: car });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
});

app.post('/cars', async (req, res) => {
  try {
    // Extract the values for 'name', 'model', and 'year' from the request body
    const { name, model, year } = req.body;

    // Execute a SQL query to insert a new car into the database
    await req.db.query(`INSERT INTO car (name, model, year) VALUES (?,?,?)`, [name, model, year]);

    // Send a JSON response indicating the success of the operation and redirect to '/'
    // res.status(201).json({ success: true, message: 'Car successfully created', data: null });
    res.redirect('/');
  } catch (err) {
    // Handle errors that may occur during the execution of the try block
    res.status(400).json({ success: false, message: 'Bad request', data: null });
  }
});

app.delete('/cars/:id', async (req, res) => {
  try {
    // Extract the car ID from the request parameters
    const carId = req.params.id;

    // Execute a SQL query to update the 'deleted_flag' for a specific car in the database
    await req.db.query(`UPDATE car SET deleted_flag = 1 WHERE id = ?`, [carId]);

    // Send a JSON response indicating the success of marking the car as deleted and redirect to '/'
    // res.status(200).json({ success: true, message: 'Car marked as deleted successfully', data: null });
    res.redirect('/');
  } catch (err) {
    // Handle errors that may occur during the execution of the try block
    res.status(400).json({ success: false, message: 'Bad request', data: null });
  }
});

app.put('/cars/:id', async (req, res) => {
  try {
    const carId = req.params.id; // Extracting the car ID from the request parameters
    const { name, model, year } = req.body; // Extracting the car details (name, model, year) from the request body

    // Using the database connection (req.db) to execute an UPDATE query
    await req.db.query(`UPDATE car SET name = ?, model = ?, year = ? WHERE id = ?`, [name, model, year, carId]);

    // Sending a JSON response indicating success
    res.status(200).json({ status: 200, message: 'Car updated successfully', data: null });
  } catch (err) {
    // Handling any errors that might occur during the execution of the try block
    res.status(400).json({ status: 400, message: 'Bad request', data: null });
  }
});

app.listen(port, () => console.log(`212 API Example listening on http://localhost:${port}`));
