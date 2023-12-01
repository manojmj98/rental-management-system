import React, { useState } from 'react';
// import './messages.css';
import { IoMdSend } from "react-icons/io";

function ChatInput({handleSendMsg}) {
  const [msg, setMsg] = useState('');

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };


  return (
    <div className='h-full'>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          className='input-container-input'
          type="text"
          placeholder="Message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" className='input-container-button'>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
