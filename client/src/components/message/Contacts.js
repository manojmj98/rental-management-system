import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus } from 'react-icons/fa';
import './messages.css';
import { toast } from 'react-toastify';

function Contacts({ contacts, changeChat, setContacts }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [newChat, setNewChat] = useState(false);
  const [newChatInput, setNewChatInput] = useState('');

  const getUserID = async (username) => {
    const response = await fetch(
      '/api/user/get-id?' + new URLSearchParams({ username })
    );
    const id = await response.json();

    return id._id;
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const startChat = async (e) => {
    e.preventDefault();

    if (!newChatInput) return;

    const usernames = newChatInput.split(',');
    let ids = [];

    for (let i = 0; i < usernames.length; i++) {
        const id = await getUserID(usernames[i]);
        if(!id) {
          toast.error(`User ${usernames[i]} not found`);
          return;
        }
        ids.push(id);
    }
    
    const contact = { recipients: ids, usernames };
    setContacts([contact, ...contacts]);
    changeCurrentChat(0,contact);
    setNewChatInput('');
    setNewChat(false);
  };

  const newChatHandler = () => {
    setNewChat(true);
  };

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
        {newChat ? (
          <form
            className='input-container'
            onSubmit={(event) => startChat(event)}
          >
            <input
              className='input-container-input'
              type='text'
              placeholder='Usernames'
              onChange={(e) => setNewChatInput(e.target.value)}
              value={newChatInput}
            />
            <button type='submit' className='input-container-button'>
              <FaPlus />
            </button>
          </form>
        ) : (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full'
            onClick={newChatHandler}
          >
            New Chat
          </button>
        )}
      </div>
    </div>
  );
}

export default Contacts;
