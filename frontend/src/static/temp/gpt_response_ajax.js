// add event listener to get gpt response for the given user input
document.getElementById("gpt_response_form").addEventListener('submit', function(event){
    // prevent the default action of the form
    event.preventDefault();
    event.disabled = true;

    // get target that triggered the event
    form = event.target;
    // wrapped the form into formData object to get its elements
    formData = new FormData(form)
    // request ajax call to the server to fetch data
    fetch(gpt_response_form_action, {
        method: 'POST', body: formData,
        headers: {
            'X-Requested-With':'XMLHttpRequest' //AJAX request header
        }
    })
    .then(response => response.json()) 
    .then(data => {
        //when the data is recieved from the server then the gpt response is updated
        document.getElementById('gpt_response').value = data.gpt_response;
        historyPanel_with_title = document.getElementById('historyPanel');
        historyPanel = historyPanel_with_title.children[0];
        historyNode = `<textarea style='width: 100%;height: 10%;border-radius: 10px;border-width: 1px;border-color: var(--bs-link-hover-color);'>${data.gpt_response}</textarea>`;
        if (historyPanel_with_title.children.length > 20) {
            historyPanel_with_title.removeChild(historyPanel_with_title.lastChild);
        }
        historyPanel.insertAdjacentHTML("afterend", historyNode);
        event.disabled = false;
    })
    .catch(error => {
        console.error('Error: ', error);
    });
});
