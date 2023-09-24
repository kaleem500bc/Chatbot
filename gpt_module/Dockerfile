# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

WORKDIR /app
COPY config.yaml gpt_module.py flask_api.py requirements.txt /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5001

CMD ["python", "flask_api.py"]