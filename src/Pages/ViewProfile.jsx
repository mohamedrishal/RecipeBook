import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import avatar from "../Assets/user.jpg";
import Avatar from "@mui/material/Avatar";
import ViewPost from "../Components/ViewPost";
import { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddPost from "../Components/AddPost";
import { userAllPostsAPI } from "../Services/allAPI";
import { useContext } from "react";
import { addPostResponseContext, deletePostResponseContext, editPostResponseContext } from "../Contexts/ContextShare";

function ViewProfile() {
   
  const {addPostResponse,setAddPostResponse} = useContext(addPostResponseContext)
  const {deleteResponse,setDeleteResponse} = useContext(deletePostResponseContext)
  const {editResponse,setEditResponse} = useContext(editPostResponseContext)
  


  const [userDetails,setUserDetails]= useState("")

  useEffect(()=>{
    if(sessionStorage.getItem('existingUser')){
      setUserDetails(JSON.parse(sessionStorage.getItem("existingUser")))
    }
  },[])


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const iseditAndDeleteBtn = true

  
  const [userAllPosts,setUserAllPosts] = useState([])

  const getUserAllPosts = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }

      const result = await userAllPostsAPI(reqHeader)
      if(result.status===200){
        setUserAllPosts(result.data)
      }else{
        console.log(result);
      }
    }
  }

  useEffect(()=>{
    getUserAllPosts()
  },[addPostResponse,deleteResponse,editResponse])


  return (
    <>
      <Header userDetails={userDetails} />

      <div className="d-flex flex-column align-items-center mt-4">

        {/* Profile  */}
        <div
          style={{
            borderRadius: "100% 100% 0% 0%",
            width: "400px",
            backgroundColor: "#f2f2f2",
          }}
          className="border w-75 d-flex align-items-center flex-column mt-5 px-4"
        >
          <Avatar
            alt="Remy Sharp"
            className="img-fluid mt-1"
            src={avatar}
            sx={{ width: 80, height: 80 }}
          />
          
          <div className="ms-3 d-flex flex-column w-100 text-center">
            <span style={{ fontSize: "22px" }} className="fw-bold">
              {userDetails?.username}
            </span>
            <span style={{ fontSize: "15px" }} className="d-flex justify-content-center w-100">
              <p>{userDetails?.email}</p>
              <div
            onClick={handleShow}
            className="ms-auto btn btn-outline-dark border-0 rounded-circle"
          >
            <i class="fa-solid fa-user-pen"></i>
          </div>
            </span>
          </div>
         
        </div>

        {/* content */}
        <div className="d-flex flex-column flex-lg-row w-75 justify-content-between ">

          <div
            className="w-100"
          >
            <AddPost />
            <div
              className="border w-100 mt-2 d-flex justify-content-center align-items-center "
              style={{ height: "290px", backgroundColor: "#f2f2f2" }}
            >
              <div
                className="website mt-4 "
                style={{ width: "200px", fontSize: "15px" }}
              >
                <h4 className="fw-bolder">
                  Rec<span className="text-danger">ipe</span> bOOk
                </h4>
                <h6 style={{ fontSize: "14px" }}>
                  Designed and built with all the love in the world by the
                  luminr team with the help of our contributors.
                </h6>
                <h6 style={{ fontSize: "11px" }}>
                  Code licensed luminar, docs CC BY 3.0.
                </h6>
                <p className="text-dark">Currently v1.0.0.</p>
              </div>
            </div>
          </div>

          <div className="w-100 ms-2">
            { userAllPosts.length>0 ? [...userAllPosts].reverse().map((post)=>(
              <ViewPost post={post} iseditAndDeleteBtn={iseditAndDeleteBtn} />
            )) : <h5>NO posts</h5>}
          </div>

        </div>
      </div>

      <Footer />

      {/* Modal Edit PRofile  */}
      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
          <label>
            <input style={{ display: "none" }} type="file" />
            <Avatar
              alt="Remy Sharp"
              className="img-fluid mb-2"
              src={avatar}
              sx={{ width: 80, height: 80 }}
            />
          </label>

          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control type="text" placeholder="Username" autoFocus />
          </Form.Group>

          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control type="email" placeholder="name@gmail.com" autoFocus />
          </Form.Group>

          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="password"
              placeholder="New Password"
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div
            style={{ fontSize: "12px" }}
            className="border btn btn-outline-dark rounded-5 px-4 ms-auto"
            variant="secondary"
            onClick={handleClose}
          >
            Confirm
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewProfile;
