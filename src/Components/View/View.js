import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { postContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/context';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/config'

function View() {

  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(postContext)
  const {Firebase} = useContext(FirebaseContext)

  async function fetchData(userId) {
    try {
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setUserDetails(data)
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData(postDetails.userId);
    console.log("user : "+userDetails);
  }, [postDetails.userId]);


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
        }
      </div>
    </div>
  );
}
export default View;