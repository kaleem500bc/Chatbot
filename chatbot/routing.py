from django.urls import re_path
from chatbot.members.GPTResponseConsumer import GPTResponseConsumer

websocket_urlpatterns = [
    re_path('ws/whisper_gpt_response/', GPTResponseConsumer.as_asgi())
]