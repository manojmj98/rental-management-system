import React, { useState } from 'react';
import { useGetMessagesQuery } from '../../slices/messagesApiSlice';

function ChatContainer({ currentChat, userInfo }) {
  const [messages, setMessages] = useState([]);

  const recipients = [...currentChat.recipients];

  console.log(recipients);
  const { data } = useGetMessagesQuery({ recipients });

  return (
    <div className='grid grid-rows-6 min-h-full max-h-full' style={{gridTemplateRows: '10% 80% 10%'}}>
      <div className=''>Header</div>

      <div className='flex flex-col overflow-scroll overflow-x-hidden gap-3 min-h-3'>
        {data === undefined ? (
          <div></div>
        ) : (
          data.map((message) => {
            if (message.from === userInfo.id) {

              return (<div className='flex items-center justify-end mr-3'>
                <p className='max-w-[50%] rounded-2xl p-2.5 bg-green-800'>
                  {message.message}
                </p>
              </div>)
            }
            return (<div className='flex items-center ml-3'>
                <p className='max-w-[50%] rounded-2xl p-2.5 bg-blue-800'>
                  {message.message}
                </p>
              </div>)
          })
        )}
      </div>
      <div className=''>Footer</div>
    </div>
  );
}

export default ChatContainer;
