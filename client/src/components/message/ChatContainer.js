import React, { useEffect, useState } from 'react';
import './messages.css';
import Spinner from 'react-bootstrap/Spinner';
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from '../../slices/messagesApiSlice';
import ChatInput from './ChatInput';
import { toast } from 'react-toastify';

function ChatContainer({ currentChat, userInfo, socket }) {
  const [messages, setMessages] = useState([]);

  const recipients = [...currentChat.recipients];

  const { data } = useGetMessagesQuery({ recipients });

  const [sendMessage] = useAddMessageMutation();

  useEffect(() => {
    if (data) {
      const temp = [...data];
      setMessages([...temp.reverse()]);
    }
  }, [setMessages, data]);

  const haveSameContents = (a, b) => {
    for (const v of new Set([...a, ...b]))
      if (a.filter((e) => e === v).length !== b.filter((e) => e === v).length)
        return false;
    return true;
  };

  const handleSendMsg = async (msg) => {
    try {
      const res = await sendMessage({ recipients, message: msg });
      socket.emit('send-msg', {
        recipients: recipients,
        from: userInfo.id,
        message: msg,
        id: res.data._id,
      });
      const msgs = [...messages];
      setMessages([{ from: userInfo.id, message: msg, id: res.data._id }].concat(msgs));
    } catch (error) {
      toast.error(
        error?.data?.error || 'Your request was unable to be processed'
      );
    }
  };

  useEffect(() => {
    function onReceiveMessage(data) {
      if (haveSameContents(data.users, [userInfo.id, ...recipients])) {
        const msgs = [...messages];
        console.log(msgs);
        setMessages([{ from: data.from, message: data.message, id: data.id }].concat(msgs));
      }
    }

    socket.on('msg-receive', onReceiveMessage);

    return () => {
      socket.off('msg-receive', onReceiveMessage)
    }

  }, [messages, socket, userInfo]);

  return (
    <div
      className='grid h-full'
      style={{ gridTemplateRows: '5% 90% 5%' }}
    >
      <div className='grid grid-cols-3 bg-[#142039] rounded-tr-lg'>
        <h3 className='font-bold text-2xl text-white ml-3'>
          {currentChat.usernames.toString()}
        </h3>
      </div>

      <div className='flex flex-col-reverse overflow-scroll overflow-x-hidden gap-3 min-h-3 bg-gray-900 no-scrollbar pb-2'>
        {data === undefined ? (
          <Spinner className='self-center mt-5'></Spinner>
        ) : (
          messages.map((message) => {
            if (message.from === userInfo.id) {
              return (
                <div
                  className='flex items-center justify-end mr-3'
                  key={message.id}
                >
                  <p className='max-w-[50%] rounded-2xl p-2.5 bg-green-800'>
                    {message.message}
                  </p>
                </div>
              );
            }
            return (
              <div className='flex items-center ml-3' key={message.id}>
                <p className='max-w-[50%] rounded-2xl p-2.5 bg-blue-800'>
                  {message.message}
                </p>
              </div>
            );
          })
        )}
      </div>
      <div className='bg-[#142039] rounded-br-lg'>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}

export default ChatContainer;
