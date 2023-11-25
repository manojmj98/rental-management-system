import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../common/NavBar';
import Contacts from './Contacts';
import ChatContainer from './ChatContainer';

function MessagesPage(props) {
  const [currentChat, setCurrentChat] = useState(undefined);

  const { userInfo } = useSelector((state) => state.auth);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const testData = [
    {
      recipients: ['651b6267acef841744a388c8'],
      usernames: ['Username'],
    },
  ];

  return (
    <>
      <div className='w-screen h-screen bg-black'>
        <NavBar />
        <div className='flex flex-col justify-center items-center'>
          <div className='h-[85vh] w-[65vw] grid grid-cols-5 bg-transparent'>
            <Contacts contacts={testData} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <></>
            ) : (
              <div className='col-span-4 overflow-hidden'>
                <ChatContainer currentChat={currentChat} userInfo={userInfo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagesPage;
