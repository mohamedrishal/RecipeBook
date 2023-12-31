import React from "react";

function RightSide() {
  return (
    <div
      className="sidebar col-3 h-100 container position-fixed end-0 mt-5 border"
      style={{ backgroundColor: "#f0f2f5" }}
    >
    <div className="d-flex align-items-center flex-column">
       <div className="px-4 mt-4">
          <div
            style={{
              backgroundColor: "#b9e3ba",
              borderRadius: "100% 0% 100% 0%",
            }}
            className="text-center w-100 container mt-5 border"
          >
            <img
              className="img-fluid"
              src="https://myownstationery.com/assets/site/Blog/content-150900344009_Recipes-Notebook.gif"
              alt=""
            />
          </div>
       </div>
  
        <div>
          <div className="links d-flex  flex-column p-3  ">
            <div
              className="website mt-4 w-100 container "
              style={{ width: "200px", fontSize: "15px" }}
            >
              <h4 className="fw-bolder text-dark" style={{fontFamily:"'Cinzel', serif"}}>
              🧑‍🍳Rec<span className="text-danger">ipe</span>booK
            </h4>
              <h6 className="mt-2" style={{ fontSize: "12px",fontFamily:"'Play', sans-serif"}}>
                Unleash your inner chef with our Recipe Book! 📚 Share your
                favorite recipes, tweak them to perfection, and savor the joy of
                cooking.
              </h6>
              <h6 style={{ fontSize: "10px" }}>
                Code licensed MRishal, docs CC BY 3.0.
              </h6>
              <p className="text-dark">Currently v1.0.0.</p>
            </div>
          </div>
        </div>
        <div>
          <p style={{ fontSize: "10px" }}>
            copyright @ 2023 Recipe Book. buit with React.
          </p>
        </div>
    </div>
    </div>
  );
}

export default RightSide;
