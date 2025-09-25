import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import Footer from "./landing_page/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TopNav from "./landing_page/TopNav";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import Signup from "./landing_page/signup/Signup";
import Support from "./landing_page/support/Support";
import NotFound from "./landing_page/NotFound";
import Login from "./landing_page/signup/Login";
import Home from "./components/Home";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <TopNav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<Support />} />

        {/* Dashboard nested route */}
        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}

        <Route
          path="/dashboard/*"
          element={
            localStorage.getItem("token") ? <Home /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
    <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
