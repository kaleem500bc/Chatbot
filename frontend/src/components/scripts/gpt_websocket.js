// websocket for recieving gpt response
const SetupWebSocket = () => {
    const gpt_socket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/whisper_gpt_response/'
    );

    gpt_socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        var filtered_data = data["message"].replace("\n", " ");
        document.getElementById("gpt_response").value = filtered_data
        var historyPanel_with_title = document.getElementById('historyPanel');
        var historyPanel = historyPanel_with_title.children[0];
        var historyNode = `<textarea style='width: 100%;height: 10%;border-radius: 10px;border-width: 1px;border-color: var(--bs-link-hover-color);'>${filtered_data}</textarea>`;
        if (historyPanel_with_title.children.length > 20) {
            historyPanel_with_title.removeChild(historyPanel_with_title.lastChild);
        }
        historyPanel.insertAdjacentHTML("afterend", historyNode);
    };

    gpt_socket.onclose = () => {
        console.error('Chat socket closed');
    };
}
export default SetupWebSocket;
