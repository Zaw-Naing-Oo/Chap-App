import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
 
    useEffect(() => {

      const getMessages = async () => {
        const docRef = doc(db, "chats", data.chatId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMessages(docSnap.data().messages);
        } else {
          console.log("No such document!");
        }
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