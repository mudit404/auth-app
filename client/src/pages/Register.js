import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from 'components/Navbar'


function Register() {
  const navigate= useNavigate()
  
  const [email, setEmail]= useState('');
  const [name, setName]= useState('');
  const [password, setPassword]= useState('');

  async function registerUser(event){
    event.preventDefault()

    const res= await fetch('http://localhost:1337/api/register', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data= await res.json()
    if(data.status === 'ok'){
      navigate('/login')
    }

    console.log(data);
  }

  return (
    <div>
      <Navbar />
      <div className="main-page">
      <div className="landing">
        <h1>Sign Up!</h1>
        <form onSubmit={registerUser}>
          <label>Full Name:</label>
          <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Full Name" />
          <br/>
          <label>E-mail:</label>
          <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="E-mail" />
          <br/>
          <label>Password:</label>
          <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
          <br/>
          <button type="submit" className="btn btn-success w-100 rounded-0"> Sign Up </button>
        </form>
      </div>
    </div>
    </div>
    
  );
}

export default Register;
