import { updateHistoryPanel } from "./helperfunc";

async function GPTEndpoint (event){
    // prevent the default action of the form
    event.preventDefault();
    event.disabled = true;

    // get target that triggered the event
    const form = event.target.form;

    // request ajax call to the express server to fetch data
    const test_url = "http://localhost:5010/gpt"
    fetch(test_url, {
        method: 'POST', body: JSON.stringify({"input_text": form.input_text.value}),
        headers: {
            'X-Requested-With':'XMLHttpRequest', //AJAX request header
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) 
    .then(data => {
        //when the data is recieved from the server then the gpt response is updated and add it to the history panel
        document.getElementById('gpt_response').value = data.gpt_response;
        updateHistoryPanel(data.gpt_response);
    })
    .catch(error => {
        console.error('Error: ', error);
    });
}

async function LoadHistory(event){
    const test_url = "http://localhost:5010/loadHistory";
    fetch(test_url, {
        method: 'POST',
        headers: {
            'X-Requested-With':'XMLHttpRequest', //AJAX request header
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        //update the history panel
        updateHistoryPanel(data.history);
    })
}

export {GPTEndpoint, LoadHistory};