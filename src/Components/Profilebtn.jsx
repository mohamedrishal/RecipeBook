import React from 'react'
import avatar from "../Assets/user.jpg"
import Avatar from '@mui/material/Avatar';
 
function Profilebtn({userDetails}) {

  return (
    <>
    <div className='d-flex justify-content-center  align-items-center'>
        <div className=''>
        <Avatar alt="Remy Sharp" className='img-fluid' src={avatar}  sx={{ width: 34, height: 34 }} />
        </div>
        <div className='ms-3 d-flex flex-column'>
            <span style={{fontSize:"14px"}} className='fw-bold'>{userDetails?.username}</span>
            <span style={{fontSize:"9px"}} className=''>{userDetails?.email}</span>
        </div>
    </div>
    </>
  )
}

export default Profilebtn