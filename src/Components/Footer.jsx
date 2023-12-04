import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      style={{ backgroundColor:"#f2f2f2" ,width: "100%", height: "250px" }}
      className="d-flex  flex-column 
    justify-content-center align-items-center border  mt-2"
    >
      <div className="footer-div d-flex justify-content-evenly w-100 flex-wrap mt-2"> 
        <div className="links d-flex  flex-column">
          <h6>Links</h6>
          <Link
            className="text-dark mt-2"
            to={"/home"}
            style={{ textDecoration: "none", fontSize:"13px" }}
          >
            {" "}
            Home
          </Link>
          <Link
            className="text-dark"
            to={"/"}
            style={{ textDecoration: "none", fontSize:"13px" }}
          >
            {" "}
            Login
          </Link>

          <Link
            className="text-dark"
            to={"/"}
            style={{ textDecoration: "none", fontSize:"13px" }}
          >
            {" "}
            Register
          </Link>
        </div>
        <div className="guides d-flex  flex-column ">
          <h6>guides</h6>
          <Link
        
            className="text-dark mt-2"
            to={"https://getbootstrap.com/"}
            style={{ textDecoration: "none",fontSize:"13px" }}
          >
            {" "}
            React
          </Link>
          <Link
        
            className="text-dark"
            to={"https://react-bootstrap.netlify.app/"}
            style={{ textDecoration: "none",fontSize:"13px" }}
          >
            {" "}
            React bootstrap
          </Link>

          <Link
        
            className="text-dark"
            to={"/watch-history"}
            style={{ textDecoration: "none",fontSize:"13px" }}
          >
            {" "}
            Routing
          </Link>
        </div>
        <div className="contacts">
          <h6>Contact Us</h6>
          <div className="sub d-flex mt-3">
            <input
            size={"sm"}
            style={{fontSize:"10px"}}              type="text"
              className="form-control h-50"
              placeholder="Enter your email"
            />
            <button style={{fontSize:"10px"}} className="btn btn-primary ms-3 bg-dark h-50">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="icons fs-4 d-flex justify-content-evenly mt-2">
            <Link
          
              className="text-dark"
              to={"https://mail.google.com/"}
              style={{ textDecoration: "none",fontSize:"16px" }}
            >
              <i class="fa-solid fa-envelope"></i>{" "}
            </Link>

            <Link
          
              className="text-dark"
              to={"https://getbootstrap.com/"}
              style={{ textDecoration: "none",fontSize:"16px" }}
            >
              <i className="fa-brands fa-facebook"></i>{" "}
            </Link>

            <Link
          
              className="text-dark"
              to={"https://react-bootstrap.netlify.app/"}
              style={{ textDecoration: "none",fontSize:"16px" }}
            >
              <i className="fa-brands fa-twitter"></i>{" "}
            </Link>

            <Link
          
              className="text-dark"
              to={"/watch-history"}
              style={{ textDecoration: "none",fontSize:"16px" }}
            >
              <i className="fa-brands fa-github"></i>{" "}
            </Link>

            <Link
          
              className="text-dark"
              to={"/watch-history"}
              style={{ textDecoration: "none",fontSize:"16px" }}
            >
              <i className="fa-brands fa-linkedin-in"></i>{" "}
            </Link>
          </div>
        </div>
      </div>
      <p className="text-dark mt-4" style={{fontSize:"11px"}}>
        copyright @ 2023 Recipe Book. buit with React.
      </p>
    </div>
  );
}

export default Footer;