import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Create from './Pages/Create'
import Home from './Pages/Home';
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './Store/context';
import { getAuth ,onAuthStateChanged  } from 'firebase/auth';
import {Post} from './Store/PostContext'

function App() {

  const {setUser} = useContext(AuthContext)
  const {Firebase} = useContext(FirebaseContext)
  const auth = getAuth(Firebase)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user) {
        const uid = user.uid;
        setUser(user)
      } else {
        console.log("logOut");
      }
    })
  },[]);

  return (
    <div>
      <Post>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );
}

export default App;
