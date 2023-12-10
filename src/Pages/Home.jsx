import React,{useEffect,useState} from 'react'
import Header from '../Components/Header'
import RightSide from '../Components/RightSide'
import LeftSide from '../Components/LeftSide'
import Posts from './Posts'


function Home() {

  const [userDetails,setUserDetails]= useState("")
 

  useEffect(()=>{
    if(sessionStorage.getItem('existingUser')){
      setUserDetails(JSON.parse(sessionStorage.getItem("existingUser")))
    }
  },[])

  return (
    <>
    <Header/>
   <div className='row '>
        <LeftSide className="col-3" userDetails={userDetails}  />    
        <Posts className="col-6 ms-5"/>
        <RightSide className="col-3" />
   </div>
    </>
  )
}

export default Home