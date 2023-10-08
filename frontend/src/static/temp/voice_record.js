let recorded_chunks =[];
let media_recorder;

start_stop_button = "start_stop_rec";
start_stop_button = document.getElementById(start_stop_button);


// websocket for recieving gpt response
const gpt_socket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/whisper_gpt_response/'
);

gpt_socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    filtered_data = data["message"].replace("\n", " ");
    document.getElementById("gpt_response").value = filtered_data
    historyPanel_with_title = document.getElementById('historyPanel');
    historyPanel = historyPanel_with_title.children[0];
    historyNode = `<textarea style='width: 100%;height: 10%;border-radius: 10px;border-width: 1px;border-color: var(--bs-link-hover-color);'>${filtered_data}</textarea>`;
    if (historyPanel_with_title.children.length > 20) {
        historyPanel_with_title.removeChild(historyPanel_with_title.lastChild);
    }
    historyPanel.insertAdjacentHTML("afterend", historyNode);
};

gpt_socket.onclose = () => {
    console.error('Chat socket closed');
};

// When rec starts or stops
// send voice to the server to transcribe 
// and then get generate gpt response based on transcribed voice
const start_stop_recording = async () => {

    if (start_stop_button.innerHTML == "Stop...")
    {
        await media_recorder.stop();
        media_recorder.addEventListener('stop', async() => {
            const audio_blob = new Blob(recorded_chunks, {type:'audio/wav'});
            const send_blob_to_server = new FormData();
            send_blob_to_server.append('user_audio', audio_blob);
    
            const response = await fetch(whisper_transcribe_action, {
                method: "POST", 
                body: send_blob_to_server,
                headers: {
                    'X-Requested-With':'XMLHttpRequest'
                }
            });

            const audio_transcribed_text = await response.json();
            document.getElementById("input_text").innerHTML = audio_transcribed_text.whisper_transcribed_text;

        });

        start_stop_button.innerHTML = "Rec";
        recorded_chunks =[];
    }
    else
    {
        // Access the microphone
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        media_recorder = new MediaRecorder(stream);

        // event listener for recording the incoming audio
        media_recorder.ondataavailable = event => {
            if (event.data.size > 0){
                recorded_chunks.push(event.data);
            }
        };
        // start recording
        media_recorder.start();
        start_stop_button.innerHTML = "Stop...";
    }
};

start_stop_button.addEventListener('click', start_stop_recording);