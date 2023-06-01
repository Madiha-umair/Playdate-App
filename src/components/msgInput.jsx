import {useState} from 'react';

export default function msgInput() {
    const [textArea, setTextArea] = useState(null);

    return (
        <div className="msgInput">
            <textarea value={textArea} eventHandle={(e) => setTextArea(e.target.value)}/>
            <button clasName="form-submit-btn ">Submit </button>
      </div>
    );
  }