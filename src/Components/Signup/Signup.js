import React,{useContext, useState} from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../Store/context';
import {getAuth,createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { db } from '../../Firebase/config';


export default function Signup() {
  
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const {Firebase} = useContext(FirebaseContext)
  const auth = getAuth(Firebase); 

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
    
    
    // try {
      
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user
    //   console.log(user.uid);

    //   updateProfile( user, { displayName:username } )
    //   // navigate('/login')

    //   await addDoc(( collection( db, 'members' ), {
    //     id : user.uid,
    //     username : username,
    //     phone : phone
    //   })).then((res)=>{
    //     console.log(res);
    //   })
    //   // navigate('/login')

    // } catch(error) {
    //   console.log(error);
    //   // const errorCode = error.code;
    //   // const errorMessage = error.message;
    //   // console.error(`Error code: ${errorCode}, Message: ${errorMessage}`);
    // }

  // }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Update profile (optional)
    try {
      await updateProfile(user, { displayName: username });
    } catch (error) {
      console.error('Error setting display name:', error);
    }
  
    // Create document reference
    const docRef = collection(db, 'users');
  
    // Add user data to Firestore
    try {
      await addDoc(docRef, {
        id: user.uid,
        username,
        phone,
      });
      console.log('User data added successfully!');
      navigate("/login")
    } catch (error) {
      console.error('Error adding user data:', error);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            defaultValue="John"
            onChange={(e)=>{setUsername(e.target.value)}}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{navigate('/login')}}>Login</a>
      </div>
    </div>
  );
}