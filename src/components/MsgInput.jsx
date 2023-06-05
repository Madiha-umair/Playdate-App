import {useState} from 'react';

export default function msgInput() {
    const [textArea, setTextArea] = useState(null);

    return (
        <div className="msgInput">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="form-submit-btn ">Submit </button>
      </div>
    );
  }