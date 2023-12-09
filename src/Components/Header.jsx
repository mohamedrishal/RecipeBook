import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import avatar from "../Assets/user.jpg";
import Avatar from "@mui/material/Avatar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthorisationContext } from "../Contexts/TokenAuth";
import { BASE_URL } from "../Services/baseURL";
import { editProfileResponseContext } from "../Contexts/ContextShare";

function Header() {

  const [userDetails,serUserDetails] = useState({})
  const {editProfileResponse, setEditProfileResponse} = useContext(editProfileResponseContext)
  

  useEffect(() => {
    serUserDetails(JSON.parse(sessionStorage.getItem("existingUser")));
  },[editProfileResponse]);



  const navigate = useNavigate()
  const {isAuthorized , setIsAuthorized} = useContext(tokenAuthorisationContext)

  const handleLogout = ()=>{
    // remove all exisiting user details from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    // navigate to landing page
    navigate('/')
  }

  return (
    <div className="fixed-top">
      {" "}
      <Navbar
        expand="lg"
        className="p-0 m-0 border-bottom shadow"
        style={{ backgroundColor: "#f0f2f5" }}
      >
        <Container className="d-flex">
          <Navbar.Brand href="/home">
            <h5 className="fw-bolder text-dark">
              Rec<span className="text-danger">ipe</span> bOOk
            </h5>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav align-items-center">
            <Nav className="ms-auto">
              {/* Search Bar  */}
              <Nav.Link className="d-flex justify-content-center align-items-center w-100 me-5">
                {" "}
                <Form className="me-5 container">
                  <Form.Control
                    style={{ width: "320px" }}
                    className="container rounded-5 border border-1"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    size="sm"
                  />
                  
                </Form>
                <i
                  style={{ marginLeft: "-87px" }}
                  class="fa-solid fa-magnifying-glass fa-rotate-90 me-5"
                ></i>
              </Nav.Link>

              {/* Home Btn  */}
              <Nav.Link className="d-flex justify-content-center flex-column ms-4">
                <Link
                  to={"/home"}
                  className="text-decoration-none text-dark ms-5 align-items-center"
                >
                  <div
                    style={{ width: "29px", height: "29px" }}
                    className=" btn btn-outline-dark border rounded-circle d-flex flex-column justify-content-center align-items-center "
                  >
                    <i class="fa-solid fa-house"></i>
                  </div>

                  <div className="fw-bold ms-1" style={{ fontSize: "8px" }}>
                    {" "}
                    Home
                  </div>
                </Link>
              </Nav.Link>

              {/* sign out btn */}
              <Nav.Link className="d-flex justify-content-center align-items-center me-5">
                <Dropdown className="pe-5 me-5 ">
                  <Dropdown.Toggle
                    variant="transparent"
                    id="dropdown-basic"
                    // style={{height:"34px",width:"34px"}}
                    className="border-0 p-0 me-4 "
                  >
                    <div className="flex-column d-flex justify-content-center align-items-center">
                      <Avatar
                        alt="Remy Sharp"
                        className="img-fluid"
                        src={userDetails?.profile !== "" ? `${BASE_URL}/uploads/${userDetails.profile}` : avatar} 
                        sx={{ width: 29, height: 29 }}
                      />
                      <div className="fw-bold" style={{ fontSize: "9px" }}>
                        {" "}
                        Me <i class="fa-solid fa-angle-down"></i>
                      </div>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ width: "200px" }}>
                    <Dropdown.Item className="d-flex border-bottom flex-column align-items-center justify-content-center w-100">
                      <Link to={"/profile"} className="text-decoration-none">
                        <div className="d-flex ">
                          <Avatar
                            alt="Remy Sharp"
                            className="img-fluid"
                            src={userDetails?.profile !== "" ? `${BASE_URL}/uploads/${userDetails.profile}` : avatar} 
                            sx={{ width: 34, height: 34 }}
                          />
                          <div className="ms-3 d-flex flex-column">
                            <span
                              style={{ fontSize: "14px" }}
                              className="fw-bold text-dark"
                            >
                              {userDetails?.username}
                            </span>
                            <span
                              style={{ fontSize: "9px" }}
                              className="text-dark"
                            >
                              {userDetails?.email}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{ fontSize: "10px" }}
                          className="w-100 px-1 m-2 text-primary text-center border border-primary rounded-5"
                        >
                          {" "}
                          View Profile
                        </div>
                      </Link>
                    </Dropdown.Item>
                    <span style={{ fontSize: "15px" }} className="ms-1">
                      Account
                    </span>
                    <Dropdown.Item
                      href="#/action-3"
                      style={{ fontSize: "12px" }}
                      className="p-2"
                    >
                      Settings & Privacy
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      style={{ fontSize: "12px" }}
                      className="p-2 border-bottom"
                    >
                      Help
                    </Dropdown.Item>
                    <span style={{ fontSize: "15px" }} className="ms-1">
                      Manage
                    </span>
                    <Dropdown.Item
                      href="#/action-3"
                      style={{ fontSize: "12px" }}
                      className="p-2 border-bottom"
                    >
                      Post & Activity
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontSize: "12px" }}
                      className="p-2"
                    >
                      <button onClick={handleLogout} className="text-start bg-transparent h-100 text-dark w-100 border-0">
                        {" "}
                        Sign Out
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
