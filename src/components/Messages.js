import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
 
    useEffect(() => {

      const getMessages = async () => {
        onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          setMessages(doc.data().messages);
        });
      }
      getMessages();

    }, [data.chatId]);

    return (
      <div className='messages'>
      { messages.map( message => (
            <Message message={message} key={message.id} />
          ))}
      </div>

  )
}

export default Messages