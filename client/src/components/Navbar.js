import React from "react";
import { useNavigate } from "react-router-dom";


function Navbar(props){
    const navigate= useNavigate()
    
    function handleSignOut(){
        localStorage.removeItem('token');
        navigate('/login');
    }

    return<>
        <header className="top-bar">
            <img src="./logo.png" className="logo"  />
            <div className="sign-out-btn">
                {(props.val=== "true") && <button onClick={handleSignOut} 
                                            
                >Sign Out</button>}
            </div>
            
        </header>


    </>
}

export default Navbar