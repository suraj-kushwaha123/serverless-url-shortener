import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Amplify } from "aws-amplify";
import awsConfig from "./aws-config";
import App from "./App";
import "./index.css";

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 3200,
        style: {
          background: "#0f172a",
          color: "#f8fafc",
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 20px 40px rgba(0,0,0,.25)",
        },
        success: {
          iconTheme: { primary: "#22c55e", secondary: "#0f172a" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#0f172a" },
        },
      }}
    />
  </React.StrictMode>
);