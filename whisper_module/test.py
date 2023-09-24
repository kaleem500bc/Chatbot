import pyaudio
import wave

# Set the audio parameters
FORMAT = pyaudio.paInt16
CHANNELS = 1  # Mono audio
RATE = 16000  # Sample rate (samples per second)
CHUNK = 1024  # Size of each audio chunk
RECORD_SECONDS = 5  # Duration of the recording (in seconds)
OUTPUT_FILENAME = "output.wav"

# Initialize PyAudio
audio = pyaudio.PyAudio()

# # Create an audio stream
stream = audio.open(format=FORMAT, channels=CHANNELS,
                    rate=RATE, input=True,
                    frames_per_buffer=CHUNK)


print("Recording...")

frames = []

# Record audio in chunks and save to frames list
for _ in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

print("Finished recording.")

# Stop and close the audio stream
stream.stop_stream()
stream.close()
audio.terminate()

# Save the recorded audio to a WAV file
with wave.open(OUTPUT_FILENAME, 'wb') as wf:
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(audio.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))

print(f"Audio saved to {OUTPUT_FILENAME}")