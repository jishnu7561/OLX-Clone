import React,{useState,useContext} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../Store/context';
import { useNavigate } from 'react-router-dom';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {Firebase} = useContext(FirebaseContext)
  const [loginErr,setLoginError] = useState('')
  const auth = getAuth(Firebase)
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      alert("Successfully logged in")
      const user = userCredential.user;
      // ...
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // alert(error.message)
      setLoginError(errorCode)
      setTimeout(() => {
              setLoginError('')
      },5000);
    });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
        <p className='text-danger text-center' style={{color:'red'}}>{loginErr}</p>
      </div>
    </div>
  );
}

export default Login;