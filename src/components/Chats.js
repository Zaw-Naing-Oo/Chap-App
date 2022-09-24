import React, { useState, useEffect, useContext } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from "../context/AuthContext"
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  // console.log(currentUser)

  const handleSelect = (user) => {
    dispatch({type: "CHANGE_USER", payload: user})
  }

  useEffect(() => {
   const getChats = () => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      // console.log("Current data: ", doc.data());
       setChats(doc.data());
    });

    return () => {
      unsub();
    }

   }

   currentUser.uid && getChats();

  }, [currentUser.uid]);

  // console.log(Object.entries(chats))
  console.log(chats);


  return (
    <div className="chats">
      { Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (
          <div
             className="userChat"
             onClick={() => handleSelect(chat[1].userInfo)}
             key={chat[0]}
           >
             <img src={ chat[1].userInfo.photoURL} alt="" />
             <div className="userChatInfo">
               <span>{ chat[1].userInfo.displayName}</span>
               <p>{ chat[1].lastMessage?.text}</p>
             </div>
         </div>
         ))}
  </div>
  )
}

export default Chats