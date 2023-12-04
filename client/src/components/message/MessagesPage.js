import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../common/NavBar';
import Contacts from './Contacts';
import ChatContainer from './ChatContainer';
import { useGetContactsQuery } from '../../slices/messagesApiSlice';
import { socket } from '../../socket';


function MessagesPage(props) {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [contacts, setContacts] = useState(undefined);

  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useGetContactsQuery();

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    socket.emit("add-user", userInfo.id);

  },[])


  useEffect(() => {
    if (data) {
      let tempContacts = [];
      for (let i = 0; i < data.contacts.length; i++) {
        let recipients = [];
        let usernames = [];
        for (let j = 0; j < data.contacts[i].length; j++) {
          recipients.push(data.contacts[i][j].id);
          usernames.push(data.contacts[i][j].username);
        }
        tempContacts.push({ recipients, usernames });
      }
      setContacts(tempContacts);
    }
  }, [data, setContacts]);

  return (
    <>
      <div className='w-screen h-screen bg-black'>
        <NavBar />
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[85vh] w-[80vw] grid grid-cols-5 bg-transparent'>
            {contacts === undefined ? (
              <Contacts contacts={[]} changeChat={handleChatChange} setContacts={setContacts} />
            ) : (
              <Contacts contacts={contacts} changeChat={handleChatChange} setContacts={setContacts} />
            )}
            {currentChat === undefined ? (
              <></>
            ) : (
              <div className='col-span-4 overflow-hidden'>
                <ChatContainer currentChat={currentChat} userInfo={userInfo} socket={socket}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagesPage;
