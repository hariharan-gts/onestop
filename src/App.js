import { useState } from "react";
import {BrowserRouter as Router,Routes,Link,Route, useNavigate} from "react-router-dom"
import { auth } from './config';
import {signOut} from "firebase/auth";
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Addpatient from "./pages/Addpatient";
import Adduser from "./pages/Adduser";



function App() {
  const [isAuthAdmin, setisAuthAdmin] = useState(false);
  const [isAuthUser, setisAuthUser] = useState(false);
  const [isAuthDoctor, setisAuthDoctor] = useState(false);
  const [Avalues, setAvalues] = useState([]);
  //let navigate=useNavigate()
  const logout=async()=>{
    await signOut(auth)
    .then(()=>{
      setisAuthAdmin(false)
      localStorage.clear()
      window.location.pathname="/"
    })
  }
  return (
    <div className="App">
      <Router>
         <nav className="navbar">
         <Link to='/'>Home</Link>
         {(isAuthAdmin&&(localStorage.getItem("isUser")==="admin"))?
          <>
          <Link to='/Adduser'>Adduser</Link>
          <Link to='/Addpatient'>Addpatient</Link>
          <button onClick={logout}>Logout</button>
          </>
          :
          <></>
         }
         {(isAuthUser&&(localStorage.getItem("isUser")==="patient"))?<>
          <Link to='/About'>About</Link>
          <button onClick={logout}>Logout</button>
         </>:<></>}
         </nav>
         
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/About' element={<About Avalues={Avalues}/>}/>
          <Route path="/Login" element={<Login setAvalues={setAvalues} setisAuthAdmin={setisAuthAdmin} setisAuthDoctor={setisAuthDoctor} setisAuthUser={setisAuthUser} />}/>
          <Route path="/Addpatient" element={<Addpatient/>}/>
          <Route path="/Adduser" element={<Adduser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
