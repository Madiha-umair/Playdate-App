import React from 'react';
import TextMsg from './TextMsg';
import Nav from "./Nav";
import MsgInput from './MsgInput';

export default function MsgDisplay({user, selectedUser}) {
  return (
    <div className="msgDisplay">
      <TextMsg />
      <MsgInput />
      <div className="msgDisplay">
        <Nav />
      </div>
    </div>
  );
}