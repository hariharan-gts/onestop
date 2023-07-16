import React, { useState } from 'react'
import { auth,db } from '../config';
import { addDoc,collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
function Addpatient() {
    const [name, setname] = useState();
    const [age, setage] = useState(0);
    const [password, setpassword] = useState();
    const [no, setno] = useState();
    const [email, setemail] = useState();
    const [bgroup, setbgroup] = useState();
    const [weight, setweight] = useState();
    const [height, setheight] = useState();
    const [uinfo, setuinfo] = useState();
    let navigate=useNavigate()
    const centerCollectionRef=collection(db,"users")
    const dbpush=collection(db,"patient")
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
                role:"patient",
              })
              .then(async()=>{
                await addDoc(dbpush,{
                name:name||null,
                age:Number(age)||0,
                email:email||null,
                password:password||null,
                no:no||null,
                bgroup:bgroup,
                weight:weight,
                height:height,
                vist:new Array()
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
    <div className='addP'>
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
        <div className="bgroup">
            <label htmlFor="">bloodgroup</label>
             <input type="text" placeholder='bloodgroup'onChange={(e)=>setbgroup(e.target.value)}/>
        </div>
        <div className="weight">
            <lable className="w">Weight</lable>
            <input type="text" placeholder='weight' onChange={(e)=>setweight(e.target.value)}/>
        </div>
        <div className="height">
            <lable className="h">Height</lable>
            <input type="text" placeholder='Height' onChange={(e)=>setheight(e.target.value)}/>
        </div>
        <button className="submit" onClick={add}>Add</button>
    </div>
  )
}

export default Addpatient