import React, { Fragment, useState , useEffect ,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref,getDownloadURL, uploadBytes } from 'firebase/storage'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../Store/context';
import { db } from '../../Firebase/config'

const Create = () => {

  const navigate = useNavigate()
  const {Firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const storage = getStorage(Firebase)

  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const [valErr,setvalErr] = useState('')
  const date = new Date()

  // useEffect(()=>{
  //   if(!user){
  //       navigate('/login')
  //   }
  // },[user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      name.trim().length < 2 ||
      category.trim().length < 2 ||
      price.trim().length < 5 ||
      !image
  ) {
      // Display an error message or handle the validation failure
      // console.log("All fields are required and must have at least characters");
      setvalErr("All fields are required and must have at least characters")
      return;
  }

    // console.log(user);
    const imageUrls = await uploadImage(image);
    console.log(imageUrls);
    await addDoc(collection(db,'products'),{
    userId :user.uid,
    name,category,price,
    image:imageUrls,
    createdAt: date.toDateString()

    }).then(()=>{
    navigate('/')
  })
  // console.log(`brand: ${brand} description ${description} price ${price} title ${title} location ${location}`);
  }


  const uploadImage = async (image) => {
    if (!image) return null;
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" 
            name="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form onSubmit={handleSubmit}>
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button className="uploadBtn">upload and Submit</button>
            <p className='text-danger'>{valErr}</p>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;