import React, { useContext, useEffect, useState } from 'react'
import AddPost from '../Components/AddPost'
import ViewPost from '../Components/ViewPost'
import { allPostsAPI } from '../Services/allAPI'
import { addPostResponseContext, deletePostResponseContext, editPostResponseContext } from '../Contexts/ContextShare'
import { postSearchKeyContext } from '../Contexts/SearchKey'

function Posts() {

  const {addPostResponse} = useContext(addPostResponseContext)
  const {deleteResponse,setDeleteResponse} = useContext(deletePostResponseContext)
  const {editResponse,setEditResponse} = useContext(editPostResponseContext)
  const {searchKey,setSearchKey} = useContext(postSearchKeyContext)

  const [allPosts,setAllPosts] = useState([])

  const getAllPosts = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }

      const result = await allPostsAPI(searchKey,reqHeader)
      if(result.status===200){
        setAllPosts(result.data)
      }else{
        console.log(result);
      }
    }
  }

  useEffect(()=>{
    getAllPosts()
  },[addPostResponse,deleteResponse,editResponse,searchKey])

 
  return (
    <div className='post col-6 h-100 container mt-5'>
        <p className='mt-4'>
          <AddPost/>
        </p>
        <hr className='p-0' />
      { allPosts?.length ?  [...allPosts].reverse().map((post,index)=>(
        <div key={index}><ViewPost post={post} /></div>
      ))  : <h5>NOting display</h5>}
      
       
    </div>
  )
}

export default Posts