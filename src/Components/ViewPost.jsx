import React, { useContext, useEffect } from "react";
import { Avatar } from "@mui/material";
import avatar from "../Assets/user.jpg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Dropdown from "react-bootstrap/Dropdown";
import EditPost from "./EditPost";
import { BASE_URL } from "../Services/baseURL";
import { deletePostAPI, whoPostAPI } from "../Services/allAPI";
import { addPostResponseContext, deletePostResponseContext } from "../Contexts/ContextShare";


function ViewPost({iseditAndDeleteBtn,post}) {
  const [open, setOpen] = useState(false);

  // console.log(post);

  const {deleteResponse,setDeleteResponse} = useContext(deletePostResponseContext)
  const {addPostResponse,setAddPostResponse} = useContext(addPostResponseContext)

  const [whoPost,setWhoPost] = useState(null)

  const getWhoUser = async()=>{
    if(post.userId){
      const userId = post.userId;
      const result = await whoPostAPI(userId)
      if(result.status===200){
        setWhoPost(result.data)
      }else{
        console.log(result);
      }
    }
  }

  const handleDelete = async (id)=>{

    const token = sessionStorage.getItem('token')
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
    const result =  await deletePostAPI(id,reqHeader)
    if(result.status===200){
      // page reloaded
      alert('delete')
      setDeleteResponse(result.data)
    }else{
      alert(result.response.data)

    }

  }



  useEffect(()=>{
    getWhoUser()
  },[addPostResponse])

  return (
    <div
      style={{ backgroundColor: "#f2f2f2" }}
      className="border rounded p-3 mt-2"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center me-5 ">
          <div>
            <Avatar
              alt="Remy Sharp"
              className="img-fluid border"
              src={avatar}
              sx={{ width: 34, height: 34 }}
            />
          </div>
          <div className="ms-3 d-flex flex-column">
            <span style={{ fontSize: "14px" }} className="fw-bold">
              {whoPost?.username}
            </span>
            <span style={{ fontSize: "9px" }} className="">
            {whoPost?.email}
            </span>
          </div>
        </div>
        {/* edit delete */}
        {iseditAndDeleteBtn ? <div>

        <Dropdown>
                  <Dropdown.Toggle
                    variant="transparent"
                    id="dropdown-basic"
                    className="border-0"
                  >
                   <i class="fa-solid fa-ellipsis-vertical"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>

                    <Dropdown.Item
                      href="#/action-3"
                      style={{ fontSize: "12px" }}
                      className="p-2"
                    >
                      <EditPost post={post}/>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={()=>handleDelete(post._id)}
                      href="#/action-3"
                      style={{ fontSize: "12px" }}
                      className="p-2"
                    >
                      <i class="fa-solid fa-trash"></i> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

       
        </div> : <div>

<Dropdown>
          <Dropdown.Toggle
            variant="transparent"
            id="dropdown-basic"
            className="border-0"
          >
           <i class="fa-solid fa-ellipsis-vertical"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>

          <Dropdown.Item
              href="#/action-3"
              style={{ fontSize: "12px" }}
              className="p-2 text-danger" 
            >
              Report
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-3"
              style={{ fontSize: "12px" }}
              className="p-2" 
            >
              cancel
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


</div> }
      </div>

      <div className="mt-1">
        <div>
          {post.recipename}
          <Button
          className="border-0 text-dark"
            style={{ backgroundColor: "#f2f2f2" }}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
           <i class="fa-solid fa-angle-down"></i>
          </Button>{" "}
          
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text" style={{fontSize:"12px"}}>
           {post.make}
          </div>
        </Collapse>
      </div>
      <div className=" mt-2 rounded">
        <img
          style={{ height: "250px", width: "100%" }}
          className="img-fluid rounded-4 border border-2"
          src={post && `${BASE_URL}/uploads/${post.recipeImage}`}
          alt=""
        />
      </div>
      <hr />
      <div className="d-flex justify-content-around">
      <i class="fa-regular fa-heart "></i>{" "}
      <i class="fa-regular fa-comment "></i>
      </div>
    </div>
  );
}

export default ViewPost;
