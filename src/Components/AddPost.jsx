import React, { useContext, useEffect } from "react";
import avatar from "../Assets/user.jpg";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPostAPI } from "../Services/allAPI";
import { addPostResponseContext, editPostResponseContext } from "../Contexts/ContextShare";
import { BASE_URL } from "../Services/baseURL";

function AddPost() {

  const [userDetails,serUserDetails] = useState({})
  const {editProfileResponse, setEditProfileResponse} = useContext(editPostResponseContext)
  

  useEffect(() => {
    serUserDetails(JSON.parse(sessionStorage.getItem("existingUser")));
  },[editProfileResponse]);

  const {setAddPostResponse} = useContext(addPostResponseContext)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPostDetails({ recipename: "", make: "", recipeImage: "" });
    setPreview("");
  };
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      add Media
    </Tooltip>
  );

  const [postDetails, setPostDetails] = useState({
    recipename: "",
    make: "",
    recipeImage: "",
  });

  // files url convert chayyanee...
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (postDetails.recipeImage) {
      setPreview(URL.createObjectURL(postDetails.recipeImage));
    }
  }, [postDetails.recipeImage]);

  // console.log(postDetails);

   // token require 

   const [token,setToken] = useState("")

   useEffect(()=>{
     if(sessionStorage.getItem("token")){
       setToken(sessionStorage.getItem("token"))
     }else{
       setToken("")
     }
   },[])

  // add Post
  const handleAddPost = async (e) => {
    e.preventDefault();
    const { recipename, make, recipeImage } = postDetails;
    if (!recipename || !make || !recipeImage) {
      toast.info("Please Fill the Form Completely..!");
    } else {
      const reqBody = new FormData();
      reqBody.append("recipename", recipename);
      reqBody.append("make", make);
      reqBody.append("recipeImage", recipeImage);

      if(token){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        const result = await addPostAPI(reqBody, reqHeader);
        if (result.status === 200) {
          console.log(result.data);
          handleClose()
          toast.success('Posting....')
          setAddPostResponse(result.data)
        }else{
          console.log(result);
          console.log(result.response.data);
          toast.warning(result.response.data)
        }
      }else{
        
      }
      
    }
  };

 

  return (
    <>
      <div
        style={{ backgroundColor: "#f2f2f2" }}
        className="border rounded p-3 mt-2"
      >
        <div className="d-flex align-items-center">
          <div>
            <Avatar
              alt="Remy Sharp"
              className="img-fluid me-3"
              src={userDetails?.profile !== "" ? `${BASE_URL}/uploads/${userDetails.profile}` : avatar} 
              sx={{ width: 34, height: 34 }}
            />
          </div>
          <div className="w-100 ">
            {" "}
            <div
              onClick={handleShow}
              style={{ fontSize: "12px" }}
              className="btn btn-outline-secondary w-100 border border-2 rounded-5 p-2 me-1"
            >
              Start Post
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-around">
          <i
            onClick={handleShow}
            class="fa-solid fa-images text-success fs-5 btn btn-outline-dark border-0 w-100"
          ></i>{" "}
          <i
            onClick={handleShow}
            style={{ color: "#a871ea" }}
            class="fa-solid fa-note-sticky fs-5 btn btn-outline-dark border-0 w-100"
          ></i>
        </div>
      </div>

      {/* modal  */}

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Recipe Name"
              value={postDetails.recipename}
              onChange={(e) =>
                setPostDetails({ ...postDetails, recipename: e.target.value })
              }
            />
          </Form.Group>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                placeholder="How to Make it....?"
                // className="border-0"
                as="textarea"
                value={postDetails.make}
                onChange={(e) =>
                  setPostDetails({ ...postDetails, make: e.target.value })
                }
                rows={3}
                style={{ resize: "none" }}
              />
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-center">
            <img
              style={{ height: "150px" }}
              width={"50%"}
              className="img-fluid border-5 rounded"
              src={
                preview
                  ? preview
                  : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              }
              alt=""
            />
          </div>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <div
              style={{ height: "45px", width: "45px" }}
              className="border rounded-circle d-flex justify-content-center align-items-center btn btn-outline-dark"
            >
              <label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={(e) =>
                    setPostDetails({
                      ...postDetails,
                      recipeImage: e.target.files[0],
                    })
                  }
                />
                <i class="fa-solid fa-image fs-5"></i>
              </label>
            </div>
          </OverlayTrigger>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div
            style={{ fontSize: "12px" }}
            className="border btn btn-outline-dark rounded-5 px-4 ms-auto"
            variant="secondary"
            onClick={handleAddPost}
          >
            Post
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default AddPost;
