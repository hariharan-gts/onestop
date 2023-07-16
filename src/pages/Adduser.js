import React, { useState } from 'react'
import { auth,db } from '../config';
import { addDoc,collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Adduser = () => {
    const [name, setname] = useState();
    const [age, setage] = useState(0);
    const [password, setpassword] = useState();
    const [no, setno] = useState();
    const [role, setrole] = useState("doctor");
    const [email, setemail] = useState();
    const [d, setd] = useState();
    const [speciality, setspeciality] = useState();
    const centerCollectionRef=collection(db,"users");
    const dbpush=collection(db,role);
     let navigate=useNavigate()
    const add=async()=>{
        try {
            const user=await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            .then(async(res)=>{
              await addDoc(centerCollectionRef,{
                email:email||null,
                cid:res['user']['uid']||null,
                role:role||null,
              })
              .then(async()=>{
                await addDoc(dbpush,{
                name:name||null,
                age:Number(age)||0,
                email:email||null,
                password:password||null,
                no:no||null,
                speciality:speciality||null,
                patient:new Array()
                })
                alert("Added successful")
                navigate('/Adduser')
              })
              
            })
            
          } catch (error) {
           console.log(console.error);
          }
    }
    
  return (
    <div className='addU'>
         <div className="name">
            <label htmlFor="">Name</label>
             <input type="text"  placeholder='name' onChange={(e)=>setname(e.target.value)}/>
        </div>
        <div className="age">
            <label htmlFor="">Age</label>
             <input type="number"  placeholder='ages' onChange={(e)=>setage(e.target.value)}/>
        </div>
         <div className="mail">
            <label htmlFor="">Email</label>
             <input type="email"  placeholder='email' onChange={(e)=>setemail(e.target.value)}/>
        </div>
        <div className="password">
            <label htmlFor="">Password</label>
             <input type="password" placeholder='password' onChange={(e)=>setpassword(e.target.value)}/>
        </div>
        <div className="phno">
            <label htmlFor="">Phone number</label>
             <input type="text" placeholder='phno'onChange={(e)=>setno(e.target.value)}/>
        </div>
        <div className="specialist">
            <label htmlFor="">Speciality</label>
             <input type="text" placeholder='speciality'onChange={(e)=>setspeciality(e.target.value)}/>
        </div>
        <div className="roles">
            <lable className="rolel">Roles</lable>
            <select name="role" id="role" onChange={(e)=>setrole(e.target.value)} >
                <option value="doctor">Doctor</option>
                <option value="lab">LabTechnician</option>
                <option value="pharm">Pharmist</option>
            </select>
        </div>
        <button className="submit" onClick={add}>Add</button>
        
    </div>
  )
}

export default Adduser