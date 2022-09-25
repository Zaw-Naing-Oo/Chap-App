import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  // console.log(data);
 
    useEffect(() => {

      const getMessages = async () => {
        const docRef = doc(db, "chats", data.chatId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          setMessages(docSnap.data().messages);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      getMessages();

    }, [data.chatId]);

    // console.log(messages);  

    return (
      <div className='messages'>
      { messages.map( message => (
            <Message message={message} key={message.id} />
          ))}
      </div>

  )
}

export default Messages