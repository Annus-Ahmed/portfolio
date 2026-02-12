const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Database setup
const dbPath = process.env.NODE_ENV === 'production' ? './data/contacts.db' : './contacts.db';

// Create data directory if it doesn't exist (for production)
if (process.env.NODE_ENV === 'production') {
    const fs = require('fs');
    const dataDir = './data';
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// API endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (name.length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (message.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }
    
    // Insert into database
    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.run(sql, [name, email, message], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to save message' });
        }
        res.json({ 
            success: true, 
            message: 'Message received successfully',
            id: this.lastID 
        });
    });
});

// API endpoint to get all contacts (for admin purposes)
app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve contacts' });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
