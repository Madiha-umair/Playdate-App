import React, { useState, useEffect } from 'react';
import TextMsg from './TextMsg';
import Nav from "./Nav";
import MsgInput from './MsgInput';
import axios from 'axios';

export default function MsgDisplay({ user, selectedUser }) {

  const userId = user?.user_id;
  const selectedUserId = selectedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);

  const getUsersMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8888/messages', {
        params: { userId: userId, correspondingUserId: selectedUserId }
      });
      setUsersMessages(response.data);
    } catch (error) {
      console.log("error " + error);
    }
  };

  useEffect(() => {
    getUsersMessages();
  }, []);

  console.log(usersMessages);

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





