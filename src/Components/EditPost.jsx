import React from "react";
import upload from "../Assets/glr8.jpg";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function EditPost() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        add Media
      </Tooltip>
    );
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
          <Form.Control type="text" placeholder="Recipe Name" />
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
              rows={3}
              style={{ resize: "none" }}
            />
          </Form.Group>
        </Form>

        <img
          style={{ height: "200px" }}
          width={"100%"}
          className="img-fluid"
          src={upload}
          alt=""
        />

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
              <input style={{ display: "none" }} type="file" />
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
          onClick={handleClose}
        >
          Post
        </div>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default EditPost