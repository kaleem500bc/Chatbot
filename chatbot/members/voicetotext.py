# import subprocess
# # Install the required packages
# packages = ["openai", "git+https://github.com/openai/whisper.git", "pydub"]
# for package in packages:
#   command = f"pip install {package}"
#   subprocess.run(command, shell=True)

import os
import whisper
import torch
import numpy as np


class Singleton_whisper:
  device = "cuda" if torch.cuda.is_available() else "cpu"
  _instance = None

  def __new__(whisper_cls):
    if whisper_cls._instance is None:
      whisper_cls._instance = super().__new__(whisper_cls)
    return whisper_cls._instance
  
  def __init__(self):
    self.model = whisper.load_model("base")
    _ = self.model.to(self.device)

def transcribe(audio, is_load_file = False, whisper_module = Singleton_whisper()):

  # load audio file if given
  if is_load_file:
    audio = whisper.load_audio(audio)

  #as whisper uses 30 sec window, pad or trim the voice to 30 sec
  audio = whisper.pad_or_trim(audio)

  #log-mel spectrogram of the voice signal
  mel = whisper.log_mel_spectrogram(audio).to(whisper_module.device)

  # transcribed the audio
  decode_option = whisper.DecodingOptions(fp16=False)
  result = whisper.decode(whisper_module.model, mel, decode_option)

  return result.text