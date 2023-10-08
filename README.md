# Work in progress
Deploy each module in separate pod and use kubernetes service to communicate between them.

# Chatbot
Integrate whisper and GPT module for voice recognistion and text generation. 
React Frontend
Express server (for routing and using endpoints/ API)
Flask GPT API
FLask Whisper API

## frontend module
It contain a react frontend module which is used to take input from user as text or voice. It uses Rest API of GPT2 and Whisper to generate text and for voice recognition respectively.

## Express module
It provides routing for the frontend module. It also provides endpoints for the frontend module to communicate with GPT2 and Whisper module.

## gpt module
It provides a flask api which is used to generate text from given input text. It uses pretrained GPT2(small) model for text generation.

## whisper module
It provides flask api which is used to convert voice to text. It uses pretrained whisper model to transcribe voice to text.

## Configuration
config.yaml defines parameter for the project. It defines port number for the flask API. Also contains information for the work in progress.

## Execution
Execute deploy_proj.sh to run the project. <br>
**OR**<br>
Execute following commands in terminal
```bash
# modules directories
declare -a _modules=("gpt_module" "frontend" "node_server" "whisper_module")

# copy config.yaml to each module
for module in "${_modules[@]}"
do 
    cp config.yaml $module
done

# install dependencies for each module
(cd frontend && npm install)
(cd node_server && npm install)

# run each module in background
(cd gpt_module && python flask_api.py &)
(cd whisper_module && python flask_api.py &)
(cd node_server && npm start &)
(cd frontend && npm start &)
```

## Author

Kaleem

## Contact

For questions or inquiries, please contact via [email](mailto:Kaleem500bc@gmail.com).
