
from channels.generic.websocket import AsyncJsonWebsocketConsumer as AWC
from asgiref.sync import sync_to_async
import json
from chatbot_django.views import generate_gpt_response
from chatbot.members.promptresponsegpt import *
from chatbot_django.models import History


class GPTResponseConsumer(AWC):
    async def connect(self):
        await self.accept()
        # # Subscribe the user to a channel group
        await self.channel_layer.group_add(
            "chat_group",
            self.channel_name
        )

    async def disconnect(self):
        await self.channel_layer.group_discard(
            "chat_group",
            self.channel_name
        )
        pass
    
    @sync_to_async
    def insert(self, message, gpt_response):
        histtory = History(user_input=message, gpt_response=gpt_response)
        histtory.save()

    async def chat_message(self, event):
        # This method handles messages sent to the consumer
        # in this example it's used for server-to-client communication
        message = event["message"]
        gpt_response = generate_gpt_response(message)
        await self.insert(message, gpt_response)
        await self.send(text_data=json.dumps({
            'message': gpt_response
        }))