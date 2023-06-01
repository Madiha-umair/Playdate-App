import React from 'react';
import MsgDisplay from './MsgDisplay';
import MsgboxHeader from './MsgboxHeader';
import MatchesDisplay from './MatchesDisplay';

export default function Messages() {
  return (
    <div className="msgContainer">
      <MsgboxHeader />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDisplay />
      <MsgDisplay />
    </div>
  );
}