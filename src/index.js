import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./bootstrap.min.css"
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextShare from "./Contexts/ContextShare";
import TokenAuth from "./Contexts/TokenAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Router */}
   <ContextShare>
     <TokenAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     </TokenAuth>
   </ContextShare>
  </React.StrictMode>
);
