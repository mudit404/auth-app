import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import './App.css';

const App= ()=> {
    // const navigate= useNavigate();  
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default App