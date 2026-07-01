import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      try {
        await getCurrentUser();

        if (isMounted) {
          setAuthenticated(true);
        }
      } catch {
        if (isMounted) {
          setAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 px-6 text-slate-700">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <h2 className="text-lg font-bold text-slate-950">
            Checking authentication
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Securing your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
