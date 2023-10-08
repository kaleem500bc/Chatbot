const cors = require('cors');
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const multer = require('multer');



const app = express();
// set up session for each user
const userSession = app.use(session({
    secret: "this is testing secret",
    resave: false,
    saveUninitialized: true
}));
// init history index
userSession.history_idx = 0;

const port = 5010;

const whisperEndpoint = "http://127.0.0.1:5002/whisper";
const gptEndpoint = "http://127.0.0.1:5003/gpt";
const gptEndpointHistory = "http://127.0.0.1:5003/loadHistory";

// Middleware to set CORS headers
app.use(cors({
    origin: 'http://localhost:3000',
}))

// Middleware for json body parsing
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Setup a route for the greet endpoint
app.post('/greet', (req, res) =>{
    const {input_text} = req.body;
    const greeting = `Hello, ${input_text}!`;
    res.json({message: greeting});
});

// Setup a route for the whisper endpoint
app.post('/whisper', upload.single('user_audio'), async (req, res) =>{
    // const user_audio = req.file.buffer;
    try {
        const user_audio_blob = new Blob([req.file.buffer], { type: 'audio/wav' });
        // // Create a new FormData object
        const form = new FormData();
        form.append('user_audio', user_audio_blob, 'audio.wav');
        const response = await axios.post(whisperEndpoint, form);
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.json({whisper_response: "Error in whisper"});
    }
});

// Setup a route for the gpt endpoint
app.post('/gpt', async (req, res) =>{
    try{
        const {input_text} = req.body;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(gptEndpoint, 
            JSON.stringify({"input_text":input_text}), config);
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        res.json({gpt_response: "Error in gpt"});
    }
    
});

// Setup a route for the loading history
app.post('/loadHistory', async (req, res) => {
    // const {input_text} = req.body;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let response = await axios.post(gptEndpointHistory, 
        JSON.stringify({"index":userSession.history_idx}), config);

    if (response.data.history){
        res.json(response.data);
    }
  });

// Start the server
app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
});