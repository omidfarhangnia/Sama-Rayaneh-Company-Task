"use client";

import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { isAuthenticated } = useAuth();

  return <div>{isAuthenticated ? "true" : "false"}</div>;
}

export default Dashboard;
