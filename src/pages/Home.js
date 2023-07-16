import React from 'react'
import { useNavigate } from 'react-router'
function Home() {
 let navigate=useNavigate()
  

 const doc=()=>{
        localStorage.setItem("isUser","doctor")
        navigate('/Login')
 }
 const pat=()=>{
    localStorage.setItem("isUser","patient")
    navigate('/Login')
}
const lab=()=>{
    localStorage.setItem("isUser","lab")
    navigate('/Login')
}
const phm=()=>{
    localStorage.setItem("isUser","pharmist")
    navigate('/Login')
}
const adm=()=>{
    localStorage.setItem("isUser","admin")
    navigate('/Login')
}
  return (
    <div>
        <h1>One Stop for all Problems</h1>
        <div className="type">
           <button className="login" onClick={doc}>Doctor</button>
           <button className="login" onClick={pat}>Patient</button> 
           <button className="login" onClick={lab}>Labs</button> 
           <button className="login" onClick={phm}>Pharmist</button> 
           <button className="login" onClick={adm}>Admin</button>  
        </div>
    </div>
  )
}

export default Home