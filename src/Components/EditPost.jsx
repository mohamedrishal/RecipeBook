import React, { useContext } from "react";
import upload from "../Assets/glr8.jpg";
import { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { editPostResponseContext } from "../Contexts/ContextShare";
import { BASE_URL } from "../Services/baseURL";
import { editPostAPI } from "../Services/allAPI";

function EditPost({post}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setPreview("");
      setPostDetails({
        id: post._id,
        recipename: post.recipename,
        make: post.make,
        recipeImage: "",
      });
    };

    const handleShow = () => setShow(true);
  
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        add Media
      </Tooltip>
    );

    const [postDetails, setPostDetails] = useState({
      id: post._id,
      recipename: post.recipename,
      make: post.make,
      recipeImage: "",
    });

    const {editResponse,setEditResponse} = useContext(editPostResponseContext)
    
    const [preview, setPreview] = useState("");


    useEffect(() => {
      if (postDetails.recipeImage) {
        setPreview(URL.createObjectURL(postDetails.recipeImage));
      }
    }, [postDetails.recipeImage]);


    // EDit Post

    const handleUpdate = async (e) => {
      e.preventDefault();
      const { id, recipename, make, recipeImage } = postDetails;
  
      if (!recipename || !make) {
        alert("Please Fill the Form Compeletely..!");
      } else {
        const reqBody = new FormData();
        reqBody.append("recipename", recipename);
        reqBody.append("make", make);
        preview
          ? reqBody.append("recipeImage", recipeImage)
          : reqBody.append("recipeImage", post.recipeImage);
  
        const token = sessionStorage.getItem("token");
  
        if (preview) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          };
          // api call
          const result = await editPostAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            handleClose();
            // pass response to my projects
            setEditResponse(result.data);
          } else {
            console.log(result);
            alert(result.response.data);
          }
        } else {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          };
  
          // api call
          const result = await editPostAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            handleClose();
            // pass response to my projects
            setEditResponse(result.data);
          } else {
            console.log(result);
            alert(result.response.data);
          }
        }
      }
    };


  return (
    <>
  
  <div onClick={handleShow}><i class="fa-solid fa-pen-to-square"></i> Edit</div>

    {/* modal  */}

    <Modal centered show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control value={postDetails.recipename}
              onChange={(e) =>
                setPostDetails({ ...postDetails, recipename: e.target.value })
              } type="text" placeholder="Recipe Name" />
        </Form.Group>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
            value={postDetails.make}
            onChange={(e) =>
              setPostDetails({ ...postDetails, make: e.target.value })
            }
              placeholder="How to Make it....?"
              // className="border-0"
              as="textarea"
              rows={3}
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>

     <div className="d-flex justify-content-center">
          <img
            style={{ height: "150px" }}
            width={"50%"}
            className="img-fluid border-5 rounded border"
            src={
              preview ? preview : `${BASE_URL}/uploads/${post.recipeImage}`
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
            className="border rounded-circle d-flex justify-content-center align-items-center mt-2 btn btn-outline-dark"
          >
            <label>
              <input  onChange={(e) =>
                    setPostDetails({
                      ...postDetails,
                      recipeImage: e.target.files[0]
                    })
                  } style={{ display: "none" }} type="file" />
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
          onClick={handleUpdate}
        >
          Post
        </div>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default EditPost