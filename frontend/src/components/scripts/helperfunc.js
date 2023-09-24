
const gptResponseShowAddElement = (gpt_response) => {
    //when the data is recieved from the server then the gpt response is updated
    document.getElementById('gpt_response').value = gpt_response;
    var historyPanel_with_title = document.getElementById('historyPanel');
    var historyPanel = historyPanel_with_title.children[0];
    var historyNode = `<textarea style='width: 100%;height: 10%;border-radius: 10px;border-width: 1px;border-color: var(--bs-link-hover-color);'>${gpt_response}</textarea>`;
    if (historyPanel_with_title.children.length > 20) {
        historyPanel_with_title.removeChild(historyPanel_with_title.lastChild);
    }
    historyPanel.insertAdjacentHTML("afterend", historyNode);
};

const init_media_recorder = async () => {
        
    var recorded_chunks = [];
    // Access the microphone
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    const media_recorder = new MediaRecorder(stream, {audioBitsPerSecond: 16000});

    media_recorder.addEventListener('stop', async() => {
        const audio_blob = new Blob(recorded_chunks, {type:'audio/wav'});
        const audio_data = new FormData();
        audio_data.append('user_audio', audio_blob);

        const response = await fetch("http://127.0.0.1:5002/whisper", {
            method: "POST", 
            body: audio_data,
            headers: {
                'X-Requested-With':'XMLHttpRequest'
            }
        });

        const audio_transcribed_text = await response.json();
        document.getElementById("input_text").innerHTML = audio_transcribed_text.whisper_response;
        // document.getElementById("gpt_response").innerHTML = audio_transcribed_text.gpt_response;
        gptResponseShowAddElement(audio_transcribed_text.gpt_response);
        recorded_chunks = [];

    });

    // event listener for recording the incoming audio
    media_recorder.ondataavailable = event => {
        if (event.data.size > 0){
            recorded_chunks.push(event.data);
        }
    };

    return media_recorder;
};

export {gptResponseShowAddElement, init_media_recorder};