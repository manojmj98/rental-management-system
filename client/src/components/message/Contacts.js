import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './messages.css';

function Contacts({ currentUser, contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const newChatHandler = () => {
    
  }

  return (
    <div
      className='grid min-h-full max-h-full bg-gray-900 rounded-l-lg'
      style={{ gridTemplateRows: '95% 5%' }}
    >
      <ListGroup
        className='overflow-scroll overflow-x-hidden no-scrollbar'
        variant='flush'
      >
        {contacts.map((contact, index) => {
          return (
            <ListGroup.Item
              key={contact.recipients.toString()}
              className={`${index === currentSelected ? 'active' : ''}`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              {contact.usernames.toString()}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full' onClick={newChatHandler}>New Chat</button>
      </div>
    </div>
  );
}

export default Contacts;
