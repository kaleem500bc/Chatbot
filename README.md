# Chatbot: Text and Voice

This project is a versatile chatbot that can handle both text and voice inputs. It uses OpenAI's GPT model for text-based responses and an automatic speech recognition (ASR) model for transcribing voice inputs. The chat history is stored and can be loaded for reference.

## Features

- **Text Input:** You can enter text queries, and the chatbot will respond accordingly using OpenAI's GPT model.

- **Voice Input:** You can record voice messages, and the chatbot will transcribe them and provide responses based on the transcribed text.

- **Chat History:** The chatbot keeps a history of conversations, allowing you to load previous interactions for reference.

## Install dependencies & Execute the web app
Install the required packages:
```bash
pip install -r requirements.txt
```
**Execute the web app**
```bash
python manage.py runserver
```
<br/>

**OR Deploy and access in container**
```bash
docker build -t chatbot_django .
docker run -p 8000:8000 chatbot_django
```

For both method, access the chatbot interface by opening a web browser and navigating to **http://localhost:8000**

## Usage
1. **Text Input:**
    - Enter your text query in the top text area.
    - Click the "Submit" button.
    - The chatbot's response will appear in the lower bottom text area.
2. **Voice Input:**
    - Click the "Rec" button to start recording your voice.
    - Click the "Stop..." button to stop recording.
    - The recorded audio is transcribed, and the transcribed text appears in the top text area.
    - The chatbot's response for the transcribed audio will appear in the lower bottom text area.
3. **Chat History:** 
    - Click the "History..." button to load the chat history.
    - Previous interactions will appear in the below this button.