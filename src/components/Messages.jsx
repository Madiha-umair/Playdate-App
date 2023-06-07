import React from 'react';
import MsgDisplay from './MsgDisplay';
import MsgboxHeader from './MsgboxHeader';
import MatchesDisplay from './MatchesDisplay';

export default function Messages({user}) {
  return (
    <div className="msgContainer">
      <MsgboxHeader user={user} />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDisplay matches={user.matches}/>
      <MsgDisplay />
    </div>
  );
}