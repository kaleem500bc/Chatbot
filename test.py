import pickle

with open("/home/azureuser/k8s-learning-v3/django_manager/user_audio", "rb") as f:
    np = pickle.load(f)

print("test")