history_idx = 0;
document.getElementById("loadHistory").addEventListener('click', function(event){
    fetch(load_history, {
        method: 'POST',
        body: JSON.stringify({"history_idx": history_idx}),
        headers: {
            'X-Requested-With':'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.count > 0){
            historyPanel_with_title = document.getElementById('historyPanel');
            if (historyPanel_with_title.children.length > 6) {
                historyPanel_with_title.removeChild(historyPanel_with_title.children[1]);
            }
            historyNode = `<textarea style='width: 100%;height: 10%;border-radius: 10px;border-width: 1px;border-color: var(--bs-link-hover-color);'>${data.history}</textarea>`;
            historyPanel_with_title.insertAdjacentHTML("beforeend", historyNode);
            history_idx = history_idx + 1;
        }
    })
});