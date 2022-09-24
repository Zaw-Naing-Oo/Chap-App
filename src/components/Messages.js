import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  console.log(data);
 
    useEffect(() => {

      const getMessages = async () => {
        await onSnapshot(doc(db, "chats", data.chatId), (doc) => {
          console.log(doc.data());
          doc.exists() && setMessages(doc.data().messages);
        });
      }

      return () => {
        getMessages();
      }

    }, [data.chatId]);

    console.log(messages);  

    return (
      <div className='messages'>
      { messages.map( message => (
            <Message message={message} key={message.id} />
          ))}
      </div>

  )
}

export default Messages