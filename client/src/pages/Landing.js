import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/Navbar'


function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/register');
  };

  return (
    <>
    <div>
        <Navbar />
        <div className='main-page'>
            <div className='landing'>
            <h1>Welcome!!!</h1>
            <div className='btn-container'>
                <button className='btn' onClick={goToLogin}>Login</button>
                <button className='btn' onClick={goToSignUp}>Sign Up</button>
            </div>
        </div>
        </div>
    </div>
        
    </>
    );

}

export default Landing