import textMsg from './textMsg';
import msgInput from './msgInput';

export default function MsgDisplay() {
    return (
        <div>
        <textMsg/>
        <msgInput/>
      <div className="msgDisplay">
        msgDisplay
      </div>
      </div>
    );
  }