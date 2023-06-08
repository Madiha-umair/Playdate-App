import React from 'react';
import MsgDisplay from './MsgDisplay';
import MsgboxHeader from './MsgboxHeader';
import MatchesDisplay from './MatchesDisplay';
import {useState} from 'react';

export default function Messages({user}) {
  const [selectedUser, setSelectedUser] = useState(null);
  console.log('selectedUser', selectedUser);

  return (
    <div className="msgContainer">
      <MsgboxHeader user={user} />
      <div>
        <button className="option" onClick={()=> setSelectedUser(null)}>Matches</button>
        <button className="option" disabled={!selectedUser}>Chat</button>
      </div>
      {!selectedUser && <MatchesDisplay matches={user.matches}/> };

      {selectedUser && <MsgDisplay />};
    </div>
  );
}