import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Contacts({ currentUser, contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
      <ListGroup className='overflow-scroll overflow-x-hidden' variant='flush'>
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
  );
}

export default Contacts;
