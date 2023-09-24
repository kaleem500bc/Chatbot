import React from 'react';

import { GPTEndpoint } from '../scripts/gpt_request.js';
import { Recording } from '../scripts/recording.js';
// import RecordingClass from './recording.js';

const Form = () => {
  // Define the styles as JavaScript objects
  const formStyle = {
    width: '100%',
    padding: 0,
  };

  const rowStyle = {
    marginTop: '10px',
    marginLeft: '15%',
    width: '50%',
  };

  const textareaStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    borderWidth: '1px',
    borderColor: 'var(--bs-link-hover-color)',
  };

  const buttonGroupStyle = {
    marginLeft: '1px',
  };

  const historyPanelStyle = {
    width: '25%',
    padding: 0,
    maxWidth: '25%',
    marginLeft: '-30%',
    marginTop: '11px',
  };

  const colStyle = {
    height: '229.461px',
  };


//   const loadHistory = () => {
//     fetch(load_history, {
//         method: 'POST',
//         body: JSON.stringify({"history_idx": history_idx}),
//         headers: {
//             'X-Requested-With':'XMLHttpRequest'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.count > 0){
//             historyPanel_with_title = document.getElementById('historyPanel');
//             if (historyPanel_with_title.children.length > 6) {
//                 historyPanel_with_title.removeChild(historyPanel_with_title.children[1]);
//             }
//             historyNode = `<textarea style='width: 100%;height: 10%;border-radius: 10px;border-width: 1px;border-color: var(--bs-link-hover-color);'>${data.history}</textarea>`;
//             historyPanel_with_title.insertAdjacentHTML("beforeend", historyNode);
//             setHistory_idx(history_idx + 1);
//         }
//     })
//   };


  return (
    <form id="gpt_response_form" method="post">
      <div className="row">
        <div className="col-lg-8 col-auto" style={formStyle}>
          <div className="row" style={rowStyle}>
            <div className="col-lg-12 col-md-12" style={colStyle}>
              <textarea id="input_text" name="input_text" style={textareaStyle}></textarea>
            </div>
          </div>
          <div className="row" style={rowStyle}>
            <div className="col col-md-12" style={colStyle}>
              <textarea id="gpt_response" name="gpt_response" style={textareaStyle}></textarea>
            </div>
          </div>
          <div className="row" style={rowStyle}>
            <div className="col col-md-12" style={colStyle}>
              <div className="btn-group" role="group" style={buttonGroupStyle}>
                <button onClick={GPTEndpoint} className="btn btn-primary" id="submit" type="submit">Submit</button>
                <button onClick={Recording} className="btn btn-primary" id="start_stop_rec" type="button">Rec</button>
              </div>
            </div>
          </div>
        </div>
        <div id="historyPanel" name="historyPanel" className="col" style={historyPanelStyle}>
          <button className="btn btn-primary" id="loadHistory" type="button">History...</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
