import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

// import Dashboard from "./Dashboard";
// import TopBar from "./TopBar";

const Home = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     window.location.href = "http://localhost:3002/login";
  //     return;
  //   }

  //   axios
  //     .get("http://localhost:3000/verify-token", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       if (res.data.success) {
  //         setUser(res.data.user); // 🔹 decoded user from token
  //       } else {
  //         localStorage.clear();
  //         window.location.href = "http://localhost:3002/login";
  //       }
  //     })
  //     .catch(() => {
  //       localStorage.clear();
  //       window.location.href = "http://localhost:3002/login";
  //     });
  // }, []);
  return (
    <>
     {/* {user ? <h2>Welcome, {user.id} 👋</h2> : <h2>Loading...</h2>} */}
  
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
