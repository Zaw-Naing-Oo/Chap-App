import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
      const emailExist = await signInWithEmailAndPassword(auth, email, password);
      if(emailExist) {
        navigate("/");
      } else {
        setErr(true);
      }
    } catch (error) {
      setErr(true);
    }  
}

  return (
    <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Zaw Chat</span>
      <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <button>Sign in</button>
        { err && <p>Something went wrong</p> }
      </form>
      <p>
        You do not have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
  )
}

export default Login