import React, { useState } from "react";
import Navbar from "components/Navbar";


function Login() {
  
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  async function loginUser(event){
    event.preventDefault()

    const res= await fetch('http://localhost:1337/api/login', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data= await res.json();

    if(data.user){
        localStorage.setItem('token', data.user)
        window.location.href= '/dashboard'
        alert("Login Successful")
    }else{
        alert("Check username and password")
    }

    console.log(data);
  }

  return (
    <div>
        <Navbar />
        <div className='main-page'>
            <div className='landing'>
            <h1>Login!</h1>
            <form onSubmit={loginUser}>
                <label>E-mail:</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="E-mail" />
                <br />
                <label>Password:</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
                <br />
                <button type="submit" className="btn btn-success w-100 rounded-0"> Login </button>
            </form>
            </div>
        
        </div>
    </div>
    
  );
}

export default Login;
