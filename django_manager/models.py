from django.db import models

# Create your models here.
class History(models.Model):
    class Meta:
        app_label = 'chatbot'
    id = models.AutoField(primary_key=True)
    user_input = models.TextField(max_length=1000)
    gpt_response = models.TextField(max_length=1000)