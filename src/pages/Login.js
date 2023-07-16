import React from 'react'
import { useState } from 'react'
import { auth,db } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc ,collection, getDocs} from 'firebase/firestore';
import { useNavigate } from 'react-router';


function Login({ setisAuthAdmin,setisAuthUser,setisAuthDoctor,setAvalues}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [list, setlist] = useState([]);
    let navigate=useNavigate()
    const [cdata, setcdata] = useState();
    const [user, setuser] = useState();
    const [ulist, setulist] = useState();
    const [uinfo, setuinfo] = useState();
    const checkAdmin=async (userId)=>{
        try {
            const centerCollectionRef=collection(db,"users");
            const data=await getDocs(centerCollectionRef)

            setlist(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
            console.log(list);
            for(let i=0;i<list.length;i++){
                //console.log(list[i]["uid"]);
               if(list[i]['cid']===userId){
                //console.log(true);
                if(list[i]['role']==="admin"){
                    
                    setisAuthAdmin(true)
                    navigate('/About')
                    break
                }
               }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    }

    const  checkPatient=async(userId)=>{
      try {
        const centerCollectionRef=collection(db,"users");
        const data=await getDocs(centerCollectionRef)
        
        setlist(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        for(let i=0;i<list.length;i++){
           if(list[i]['cid']===userId){
          //  console.log(true);
            if(list[i]['role']==="patient"){
                setuser(true)
                setisAuthUser(true)
                break
            }

           }
        }
        // console.log(user);
        if(user){
          const centerCollectionRef=collection(db,"patient");
          const data=await getDocs(centerCollectionRef)
         console.log(data);
         console.log(uinfo);
         setulist(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
          //console.log(ulist);
          setAvalues(list.filter((doc)=>
          {
           // console.log(doc.email+" "+auth.currentUser.email);
            if(doc.email==auth.currentUser.email)

            {
              setuinfo(doc)
              //console.log(doc);
              return doc;
            }
          }
          
          ))
          console.log(uinfo);
          setAvalues(uinfo)
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    const login=async()=>{
        try{
        const user=await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        .then((res)=>{
        if(localStorage.getItem("isUser")==="admin")
        checkAdmin(auth.currentUser.uid)
        else if(localStorage.getItem("isUser")==="patient")
         checkPatient(auth.currentUser.uid)
        })
        

        }
        catch(e){
            alert(e.message)
        }
    }
  return (
    <div className='Login'>
        <div className="mail">
            <label htmlFor="">UserId</label>
             <input type="email"  placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="password">
            <label htmlFor="">Password</label>
             <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button onClick={login}>Submit</button>
    </div>
  )
}

export default Login