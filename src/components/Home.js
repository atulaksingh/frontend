import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { useUser } from "../context/UserContext";

const Home = () => {
  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
