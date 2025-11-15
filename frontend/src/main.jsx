import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ChatPage from "./ChatPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode> 
    <ChatPage/>
    <App />
  </React.StrictMode>
);
