import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import avatar from "../Assets/user.jpg";
import Avatar from "@mui/material/Avatar";
import ViewPost from "../Components/ViewPost";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddPost from "../Components/AddPost";
import { editUserProfileAPI, userAllPostsAPI } from "../Services/allAPI";
import { useContext } from "react";
import {
  addPostResponseContext,
  deletePostResponseContext,
  editPostResponseContext,
  editProfileResponseContext,
} from "../Contexts/ContextShare";
import { BASE_URL } from "../Services/baseURL";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewProfile() {
  const { addPostResponse, setAddPostResponse } = useContext(
    addPostResponseContext
  );
  const { deleteResponse, setDeleteResponse } = useContext(
    deletePostResponseContext
  );
  const { editResponse, setEditResponse } = useContext(editPostResponseContext);

  const {editProfileResponse, setEditProfileResponse} = useContext(editProfileResponseContext)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
  });

  const [exisitingImg, setExisitingImg] = useState("");

  const [preview, setPreview] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setUserDetails({
      ...userDetails,
      username: user.username,
      email: user.email,
      password: user.password,
      profile: "",
    });
    setExisitingImg(user.profile);
  },[show,editProfileResponse]);

  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile));
    } else {
      setPreview("");
    }
  }, [userDetails.profile]);

  const iseditAndDeleteBtn = true;

  const [userAllPosts, setUserAllPosts] = useState([]);

  const getUserAllPosts = async () => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const result = await userAllPostsAPI(reqHeader);
      if (result.status === 200) {
        setUserAllPosts(result.data);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getUserAllPosts();
  }, [addPostResponse, deleteResponse, editResponse]);

  // update Profile
  const handleUpdateProfile = async () => {

    const { username, email, password, profile } = userDetails;

    if (!username || !email || !password) {
      alert("Please Fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", exisitingImg);

      const token = sessionStorage.getItem("token");

      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        };
        // api call
        const res = await editUserProfileAPI(reqBody,reqHeader);
        if (res.status===200) {
          handleClose();
          sessionStorage.setItem("existingUser",JSON.stringify(res.data));
          setEditProfileResponse(res.data)
          toast.success("Profile Updated...")
        } else {
          handleClose();
          // console.log(res);
          toast.error(res.response?.data);
        }
      } else {
        const reqHeader = {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`,
        };
        // api call
        const res = await editUserProfileAPI(reqBody,reqHeader);
        if (res.status===200) {
          handleClose();
          sessionStorage.setItem("existingUser",JSON.stringify(res.data));
          setEditProfileResponse(res.data)
          toast.success("Profile Updated...")
        } else {
          handleClose();
          // console.log(res);
          toast.error(res.response?.data);

        }
      }
    }
  };

  return (
    <>
      <Header />

      <div className="d-flex flex-column align-items-center mt-4">
        {/* Profile  */}
        <div
          style={{
            borderRadius: "100% 100% 0% 0%",
            width: "400px",
            backgroundColor: "#f2f2f2",
          }}
          className="border w-75 d-flex align-items-center flex-column mt-5 px-4 position-relative"
        >
          <Avatar
            alt="Remy Sharp"
            className="img-fluid mt-1"
            src={ exisitingImg !== "" ? `${BASE_URL}/uploads/${exisitingImg}` :  avatar}
            sx={{ width: 80, height: 80 }}
          />


          <div className="ms-3 d-flex flex-column w-100 text-center">
            <span style={{ fontSize: "22px" }} className="fw-bold">
              {userDetails?.username}
            </span>
            <span
              style={{ fontSize: "15px" }}
              className="d-flex justify-content-center w-100"
            >
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
          <div className="w-100 ">
            <AddPost />
            <div
              className="border w-100 mt-2 d-flex justify-content-center align-items-center "
              style={{ height: "290px", backgroundColor: "#f2f2f2" }}
            >
              <div
                className="website mt-4 "
                style={{ width: "200px", fontSize: "15px" }}
              >
               <h5 className="fw-bolder text-dark" style={{fontFamily:"'Cinzel', serif"}}>
              🧑‍🍳Rec<span className="text-danger">ipe</span>booK
            </h5>
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
            {userAllPosts.length > 0 ? (
              [...userAllPosts]
                .reverse()
                .map((post) => (
                  <ViewPost
                    post={post}
                    iseditAndDeleteBtn={iseditAndDeleteBtn}
                  />
                ))
            ) : (
             <div style={{height:"80vh"}} className="d-flex justify-content-center align-items-center"> <h5 className="text-muted">No Posts</h5></div>
            )}
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
            <input
              style={{ display: "none" }}
              type="file"
              onChange={(e) =>
                setUserDetails({ ...userDetails, profile: e.target.files[0] })
              }
            />
            {exisitingImg !== "" ? (
              <Avatar
                alt="Remy Sharp"
                className="img-fluid mb-2"
                src={preview ? preview : `${BASE_URL}/uploads/${exisitingImg}`}
                sx={{ width: 80, height: 80 }}
              />
            ) : (
              <Avatar
                alt="Remy Sharp"
                className="img-fluid mb-2"
                src={preview ? preview : avatar}
                sx={{ width: 80, height: 80 }}
              />
            )}
          </label>

          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
              autoFocus
            />
          </Form.Group>

          {/* <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Control
              type="email"
              placeholder="name@gmail.com"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              autoFocus
            />
          </Form.Group>

          <Form.Group
            className="mb-3 w-100"
            controlId="exampleForm.ControlInput3"
          >
            <Form.Control
              type="password"
              value={userDetails?.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              placeholder="New Password"
              autoFocus
            />
          </Form.Group> */}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <button
            style={{ fontSize: "12px" }}
            className="border btn btn-outline-dark rounded-5 px-4 ms-auto"
            variant="secondary"
            onClick={handleUpdateProfile}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default ViewProfile;
