from django import request, JsonResponse
from channels.generic.websocket import AsyncWebsocketConsumer as AWC
from pydub import AudioSegment
import io
import numpy as np
from voicetotext import transcribe
    
def whisper_model_transcribe():
    
    user_audio = request.FILES.get("user_audio").read()
    # user_audio = b64decode(user_audio.split(',')[1])
    user_audio = AudioSegment.from_file(io.BytesIO(user_audio))

    # Preprocessing for whisper model
    user_audio = user_audio.set_frame_rate(16000)
    user_audio = user_audio.set_sample_width(2)
    user_audio = np.frombuffer(user_audio.raw_data, np.int16).flatten().astype(np.float32) / 32768.0
    
    # Transcribe the audio using pretrained whisper model
    transcribed_audio = transcribe(user_audio) 

    response_data = {"whisper_transcribed_text": transcribed_audio}
    return JsonResponse(response_data)