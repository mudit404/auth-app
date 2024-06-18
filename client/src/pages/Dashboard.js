import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Navbar from "components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [tempQuote, setTempQuote] = useState('');

  async function populateQuote() {
    const req = await fetch('http://localhost:1337/api/quote', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });

    const data = await req.json();
    if (data.status === 'ok') {
      setQuote(data.quote);
      setName(data.name);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        populateQuote();  // Only populate quote if the user is valid
      }
    } else {
      navigate('/login');  // Navigate to login if there's no token
    }
  }, [navigate]);  // Add navigate to the dependency array

  async function updateQuote(event) {
    event.preventDefault();

    const req = await fetch('http://localhost:1337/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    if (data.status === 'ok') {
      setQuote(tempQuote);
      setTempQuote('');
    } else {
      alert(data.error);
    }
  }

  return (
    <div>
        <Navbar val="true" />
        <div className=" dashboard">
            <h1>Hello {name}!</h1>
            
            <h2>Your Thoughts: {quote || "no quote found"}</h2>
                <br />
            <form onSubmit={updateQuote}>
                <label>Enter new Thoughts: </label>
                <input
                type="text"
                placeholder="Quote"
                value={tempQuote}
                onChange={(e) => setTempQuote(e.target.value)}
                />
                <input type="submit" value="Update Thought" />
            </form>
        </div>
    </div>
    
  );
};

export default Dashboard;
