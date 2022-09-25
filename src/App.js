import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './style.scss';
import {  Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  } 

  return (
      <Routes>
        <Route index element ={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
         } />
        <Route path='/register' element ={ <Register /> } />
        <Route path='/login' element ={ <Login   /> } />
      </Routes>
  );
}

export default App;
