const cors = require('cors');
const express = require('express');

const app = express();
const port = 50000;

// Middleware to set CORS headers
app.use(cors({
    origin: 'http://localhost:3000',
}))

// Middleware for json body parsing
app.use(express.json());

// Setup a route for the greet endpoint
app.post('/greet', (req, res) =>{
    const {username} = req.body;
    const greeting = `Hello, ${username}!`;
    res.json({message: greeting});
});

// Setup a route for the whisper endpoint
app.post('/whisper', (req, res) =>{
    const {username} = req.body;
    const whisper = `psst, ${username}!`;
    res.json({message: whisper});
});

// Setup a route for the gpt endpoint
app.post('/gpt', (req, res) =>{
    const {prompt} = req.body;
    const gpt = `gpt, ${prompt}!`;
    res.json({message: gpt});
});

// Start the server
app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
});