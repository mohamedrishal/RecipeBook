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
   <div className='d-flex justify-content-between align-itmes-center'>
        <LeftSide userDetails={userDetails} className="sidebar" />    
        <Posts/>
        <RightSide className="sidebar" />

       
   </div>
    </>
  )
}

export default Home