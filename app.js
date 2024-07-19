const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Replace with your MySQL host
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'job', // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// POST route to handle job submission
app.post('/addjob', async (req, res) => {

  const { company_id, description, salary_level, city, country, education_level, language_levels } = req.body;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log(req.body);

    // Insert job into database
    const [result] = await connection.execute(
      'INSERT INTO JobAdvertisement (company_id, description, salary_level, city, country, education_level, language_levels) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [company_id, description, salary_level, city, country, education_level, JSON.stringify(language_levels)]
    );

    connection.release(); // Release connection back to pool

    // Respond with success message
    res.send('New job advertisement added successfully!');
 
    
  } catch (error) {
    console.error('Error executing SQL:', error);
    res.status(500).send('An error occurred while adding job advertisement');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
