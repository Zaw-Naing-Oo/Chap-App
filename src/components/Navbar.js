import React, { useContext } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const auth = getAuth();

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  return (
    <div className='navbar'>
      <span className="logo">Zaw Chat</span>
      <div className="user">
        <img src={ currentUser.photoURL } alt="" />
        <span> {currentUser.displayName } </span>
        <button onClick={ () => signOut(auth)}>logout</button>
      </div>
    </div>
  ) 
}

export default Navbar