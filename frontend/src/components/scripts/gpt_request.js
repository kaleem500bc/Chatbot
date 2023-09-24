import { gptResponseShowAddElement } from "./helperfunc";

async function GPTEndpoint (event){
    // prevent the default action of the form
    event.preventDefault();
    event.disabled = true;

    // get target that triggered the event
    const form = event.target.form;

    // request ajax call to the server to fetch data
    const test_url = "http://localhost:5003/"
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
        gptResponseShowAddElement(data.gpt_response);
    })
    .catch(error => {
        console.error('Error: ', error);
    });
};
export {GPTEndpoint};