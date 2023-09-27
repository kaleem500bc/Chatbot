from django.http import JsonResponse, HttpResponse
from django.template import loader
from django_manager.models import History
import json

from chatbot.members.promptresponsegpt import *
from chatbot.members.voicetotext import transcribe
import asyncio

# For audio data processing
from pydub import AudioSegment
import io
import numpy as np

# websocket response
from channels.layers import get_channel_layer


gpt_model = Singleton_GPT_Model_Tokenizer()

def print_api(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

def gpt_response(request):
    if request.method == "POST":
        request_data = request.POST
    else:
        request_data = request.GET

    input_text = request_data.get("input_text")
    gpt_response_text = generate_text(user_input=input_text, gpt_module=gpt_model)
    
    history = History(user_input=input_text, gpt_response=gpt_response_text)
    history.save()

    response_data = {'gpt_response':gpt_response_text}
    return JsonResponse(response_data)

def generate_gpt_response(transcribed_data):
    gpt_response_text = generate_text(transcribed_data, gpt_module=gpt_model)
    return gpt_response_text

async def gpt_websocket(transcribed_audio):
    channel_layer = get_channel_layer()
    await channel_layer.group_send(
        "chat_group",
        {
            "type": "chat_message",
            "message": transcribed_audio
        }
    )

async def whisper_model_transcribe(request):
    
    user_audio = request.FILES.get("user_audio").read()
    user_audio = AudioSegment.from_file(io.BytesIO(user_audio))

    # Prepare audio data for whisper model transcription
    user_audio = user_audio.set_frame_rate(16000)
    user_audio = user_audio.set_sample_width(2)
    user_audio = np.frombuffer(user_audio.raw_data, np.int16).flatten().astype(np.float32) / 32768.0
    
    transcribed_audio = transcribe(user_audio) 
    asyncio.create_task(gpt_websocket(transcribed_audio))
    
    response_data = {"whisper_transcribed_text": transcribed_audio}
    return JsonResponse(response_data)

def load_history(request):
    history_idx = json.loads(request.body)["history_idx"]
    history = History.objects.order_by('-id')
    if history_idx < len(history):
        history = history[history_idx]
        response_data = {"history":[], "count":1}
        response_data["history"].append(history.gpt_response)
        return JsonResponse(response_data)
    else:
        return JsonResponse({"count":0})
