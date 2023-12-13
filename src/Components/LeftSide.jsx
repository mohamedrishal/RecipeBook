import React from 'react'
import Profilebtn from './Profilebtn'
import { Link } from 'react-router-dom'

function LeftSide({userDetails}) {
  return (
    <div className='sidebar col-3  h-100 container position-fixed mt-5 border p-3' style={{backgroundColor:"#f0f2f5"}}>
       <div className='d-flex flex-column justify-content-start ms-3'>
          <Link to={"/profile"} className='mt-4 w-100 btn btn-outline-dark fs-6 border py-3 '><Profilebtn userDetails={userDetails}/></Link>
          <div className='mt-4 btn btn-outline-dark text-start fs-6  border text-center '><i class="   fa-solid fa-house  me-2"></i> Home</div>
          <div className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '><i class="   fa-solid fa-address-card me-2"></i> About</div>
          <div className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '><i class="   fa-solid fa-handshake-angle  me-1"></i> Help Center</div>
          <div className='mt-2 btn btn-outline-dark text-start fs-6  border text-center '> <i class="   fa-solid fa-p me-2"></i> Privacy & Terms</div>
       </div>
    </div>  
  )
}

export default LeftSide