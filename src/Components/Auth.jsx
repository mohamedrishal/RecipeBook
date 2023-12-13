import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import bg from "../Assets/bg.jpg";
import Registration from "../Components/Registration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../Services/allAPI";
import { tokenAuthorisationContext } from "../Contexts/TokenAuth";

function Auth() {

  const {isAuthorized , setIsAuthorized} = useContext(tokenAuthorisationContext)


  // toggle eye icon for password visible  and invisible 
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-eye-slash");

  const togglePasswordVisibility = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(icon === "fa-eye" ? "fa-eye-slash" : "fa-eye");
  };


  const navigate = useNavigate();

  // form data hold a single state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(userData.email);

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      toast.warning("Please fill the form Compeletely");
    } else {
      const result = await loginAPI(userData);
      if (result.status === 200) {
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        setIsAuthorized(true)
        setUserData({
          email: "",
          password: "",
        });
        navigate("/home");
      } else {
        toast.warning(result.response.data);
        console.log(result);
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "100% 100vh",
        }}
        className="container-fluid bg-image  d-flex justify-content-center align-items-center"
      >
        <Row className="container text-center px-5">
          <Col sm={12} md={6}>
            <div className="d-flex justify-content-center align-items-center flex-column mt-5 text-white">
            <h1 className="fw-bolder text-dark" style={{fontFamily:"'Cinzel', serif"}}>
              🧑‍🍳Rec<span className="text-danger">ipe</span>booK
            </h1>
              <p style={{fontFamily:"'Beau Rivage', cursive"}} className="text-dark fs-5 fw-bold text-start ms-5">
                   Unleash your inner chef with our Recipe Book! 📚 Share your
                favorite recipes, tweak them to perfection, and savor the joy of
                cooking. 🍲✨ Categorize dishes, list ingredients effortlessly,
                and let the community flavor your creations with ratings and
                comments. 🌶👨‍🍳 Join now and elevate your culinary adventure!
              </p>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className=" d-flex justify-content-center align-items-center">
              <div
                style={{ width: "400px", height: "250px" }}
                className="bg-transparent rounded border shadow-lg p-4"
              >
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      size="md"
                      type="text"
                      placeholder="Enter Your Email Address"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                   <div className="d-flex align-items-center">
                      <Form.Control
                        size="md"
                        type= {type}
                        placeholder="Password"
                        value={userData.password}
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                      />
                     <span style={{ cursor: "pointer",marginLeft: "-30px" }} onClick={togglePasswordVisibility}>
                        <i  className={`fa-solid ${icon}`}></i>
                      </span>
                   </div>
                  </Form.Group>
                  <Button
                    onClick={handleLogin}
                    className="w-100 "
                    variant="dark"
                    size="sm"
                  >
                    Log in
                  </Button>
                </Form>
                <hr />
                <div className="my-3">
                  <Registration userData={userData} setUserData={setUserData} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default Auth;
