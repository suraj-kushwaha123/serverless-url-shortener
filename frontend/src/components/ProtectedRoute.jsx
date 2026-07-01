import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // loading | authed | guest

  useEffect(() => {
    let mounted = true;

    getCurrentUser()
      .then(() => {
        if (mounted) setStatus("authed");
      })
      .catch(() => {
        if (mounted) setStatus("guest");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (status === "guest") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
