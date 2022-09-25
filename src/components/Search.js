import React, { useContext, useState } from 'react'
import { collection, query, where, getDoc, getDocs, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext'

const Search = () => {

  const [userName, setUseName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {

    const q = query(collection(db, "users"), where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
       setErr(true);
    }

  };

  const handleKeyDown = (e) => {
     e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {

     //check whether the group(chats in firestore) exists, if not create
      const combinedId = currentUser.uid > user.uid ? 
      currentUser.uid + user.uid :
      user.uid + currentUser.uid

      try {

        // get a chat   in chats collection
        const res = await getDoc(doc(db, "chats", combinedId));

        // exists is firebase method 
        if(!res.exists()) {
        // create a chat  in chats collection between two user
          await setDoc(doc(db, "chats", combinedId ), { messages: [] });


          // update user chats
          // put  inside currentUser  with user information
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId+".userInfo"] : {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },

            // for different timezomes
            [combinedId+".date"] : serverTimestamp()
          });

          // put  inside user  with currentUser information
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId+".userInfo"] : {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },

            // for different timezomes
            [combinedId+".date"] : serverTimestamp()
          });

          
        }
      } catch (error) {
         setErr(true);
      };
      
      setErr(false);
      setUser(null);
      setUseName("");
  }

  return (
    <div className="search">
        <div className="searchForm">
            <input
                type="text"
                placeholder="Find a user"
                onChange={ (e) => setUseName(e.target.value) }
                onKeyDown = {handleKeyDown}
                value={userName}
            />
        </div>

      { err && <p>User Not Found</p>}

      { user && ( <div className="userChat" onClick={handleSelect}>
                    <img src={ user.photoURL } alt="" />
                    <div className="userChatInfo">
                      { user.displayName } 
                    </div>
                  </div> 
                )
                
    }
  </div>
  )
}

export default Search