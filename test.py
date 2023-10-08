import pickle

with open("/home/azureuser/k8s-learning-v3/chatbot_django/user_audio", "rb") as f:
    np = pickle.load(f)

print("test")