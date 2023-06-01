import React from 'react';
import TextMsg from './TextMsg';
import Nav from "./Nav";
import MsgInput from './MsgInput';

export default function MsgDisplay() {
    return (
        <div className="msgDisplay">
             < TextMsg />
          <MsgInput />
            <div className="msgDisplay">
              msgDisplay
              <Nav />
           
            </div>
      </div>
    );
  }