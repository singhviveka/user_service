const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Singh@54321', // Your MySQL password
    database: 'user_db'
});

// Connect to MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Register a new user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
