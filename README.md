# Work in progress
Deploy each module in separate pod and use kubernetes service to communicate between them.

# Chatbot
Integrate whisper and GPT module for voice recognistion and text generation. 
React Frontend
Flask GPT API
FLask Whisper API

## frontend module
It contain a react frontend module which is used to take input from user as text or voice. It uses Rest API of GPT2 and Whisper to generate text and for voice recognition respectively.

## gpt module
It provides a flask api which is used to generate text from given input text. It uses pretrained GPT2(small) model for text generation.

## whisper module
It provides flask api which is used to convert voice to text. It uses pretrained whisper model to transcribe voice to text.

## Configuration
config.yaml defines parameter for the project. It defines port number for the flask API. Also contains information for the work in progress.

## Execution
Execute deploy_proj.sh to run the project.