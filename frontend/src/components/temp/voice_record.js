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