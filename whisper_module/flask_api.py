from flask import Flask, request, jsonify
from flask_cors import CORS
import yaml
from voicetotext import WhisperModule
import numpy as np
from pydub import AudioSegment
import io

with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

app = Flask(__name__)

# Allow CORS for all endpoints
CORS(app)

whisper_module = WhisperModule()

def gpt_endpoint(input_text):
    gpt_endpoint_url = f"http://localhost:{config['gpt']['port']}/"
    # headers = {'Content-type': 'application/json'}
    # response = requests.post(gpt_endpoint_url, headers=headers , data=json.dumps({"input_text": input_text})).json()["gpt_response"]
    ## Uncomment the above lines and comment the following line to use the GPT endpoint

    # Due to memory load on the server, we are using the following dummy response
    response = "This is a test response from the GPT endpoint."

    return response

@app.route("/whisper", methods=["POST"])
def get_whisper_response():
    audio_blob = request.files["user_audio"].read()
    user_audio = AudioSegment.from_file(io.BytesIO(audio_blob))
    user_audio = user_audio.set_frame_rate(16000)
    user_audio = user_audio.set_sample_width(2)
    user_audio = np.frombuffer(user_audio.raw_data, np.int16).flatten().astype(np.float32) / 32768.0

    transcribed_audio = whisper_module.transcribe(user_audio)["response"]
    gpt_response = gpt_endpoint(transcribed_audio)

    return jsonify({"whisper_response": transcribed_audio, "gpt_response": gpt_response})


@app.route("/", methods=["GET"])
def dummy_interface():
    return "Hello World!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=config["whisper"]["port"])