import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

/* Functions for Testing Purposes */
export async function getCars() {
  const [rows] = await pool.query('SELECT * FROM car');
  return rows;
}
export async function getCar(id) {
  const [rows] = await pool.query(`SELECT * FROM car WHERE id = ?`, [id]);
  return rows;
}
export async function createCar(name, model, year) {
  const [result] = await pool.query(`INSERT INTO car (name, model, year) VALUES (?, ?, ?)`, [name, model, year]);
  const id = result.insertId;
  return getCar(id);
}
export async function deleteCar(id) {
  const [result] = await pool.query(`DELETE FROM car WHERE id = ?`, [id]);
  return result;
}
export async function deleteRecentCar() {
  const [rows] = await pool.query(`SELECT * FROM car ORDER BY id DESC LIMIT 1`);
  const id = rows[0].id;
  return deleteCar(id);
}

// const car = await deleteRecentCar();
// console.log(car);
