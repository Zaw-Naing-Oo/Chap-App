import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [passErr, setPassErr] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    

    try {
    if(password.length < 8) {
      setPassErr(true);
      return;
    }
    setPassErr(false);
    const res = await createUserWithEmailAndPassword(auth, email, password)

    const date = new Date().getTime();
    const storage = getStorage();
    const storageRef = ref(storage, `${displayName + date}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on( 
      (error) => {
        setErr(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {

          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL            
          });

           // "users" is a collection name, anyName you can give
           // res.user.is is document like a key in database
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
          setErr(false);
          navigate("/");
        });
      }
    );
    } catch (error) {
      setErr(true);
    }  
    
    

  }


  return (
    <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Zaw Chat</span>
      <span className="title">Register</span>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="display name" required />
        <input type="email" placeholder="email" required />
        <input type="password" placeholder="password" required />
        <input style={{ display: "none" }} type="file" id="file" required />
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add an avatar</span>
        </label>
        <button>Sign up</button>
      </form>
      <p>
        You do have an account <Link to="/login">Login</Link>
      </p>
      { err && <p>Error occur</p>}
      { passErr && <p> Password must have at least 8 words</p>}
    </div>
  </div>
  )
}

export default Register