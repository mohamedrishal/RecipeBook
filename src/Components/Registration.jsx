import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { registerAPI } from "../Services/allAPI";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration({ userData, setUserData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handleRegister function
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form Completely");
    } else {
      // api call
      const result = await registerAPI(userData);
      console.log(result);
      if (result.status === 200) {
        toast.success(`${result.data.username} has Registered Successfully✅`);
        setUserData({
          username: "",
          email: "",
          password: "",
        });
        handleClose();
      } else {
        toast.warning(result.response.data);
        console.log(result);
      }
    }
  };

  // toggle eye icon for password visible  and invisible
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-eye-slash");

  const togglePasswordVisibility = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(icon === "fa-eye" ? "fa-eye-slash" : "fa-eye");
  };


  return (
    <>
      <Button  variant="success" className="" onClick={handleShow}>
        Create new account
      </Button>

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Sign Up<p className="text-secondary fs-6">It's quick and easy.</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                autoFocus
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@gmail.com"
                autoFocus
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Label>Password</Form.Label>
            <div className="d-flex align-items-center">
            
              <Form.Control
                size="md"
                type={type}
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <span
                style={{ cursor: "pointer", marginLeft: "-30px" }}
                onClick={togglePasswordVisibility}
              >
                <i className={`fa-solid ${icon}`}></i>
              </span>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleRegister}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default Registration;
