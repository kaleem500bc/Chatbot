
import whisper
import torch
import numpy as np
import json
import io
from pydub import AudioSegment

class WhisperModule:
  def __init__(self):
    self.device = "cuda" if torch.cuda.is_available() else "cpu"
    self.model = whisper.load_model("base")
    _ = self.model.to(self.device)

  def transcribe(self, user_audio):
  
      #as whisper uses 30 sec window, pad or trim the voice to 30 sec
      user_audio = whisper.pad_or_trim(user_audio)

      #log-mel spectrogram of the voice signal
      mel = whisper.log_mel_spectrogram(user_audio).to(self.device)

      # transcribed the audio
      decode_option = whisper.DecodingOptions(fp16=False)
      result = whisper.decode(self.model, mel, decode_option)

      return {"response":result.text}

      