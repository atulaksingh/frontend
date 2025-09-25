import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Agar user already login hai aur URL manually /login ya /signup hai
    if (
      token &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    ) {
      navigate("/dashboard"); // redirect to dashboard
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav
        class="navbar navbar-expand-lg border-bottom"
        style={{ backgroundColor: "#FFF" }}
      >
        <div class="container p-2">
          <Link class="navbar-brand" href="/">
            <img
              src="media/images/logo.svg"
              style={{ width: "25%" }}
              alt="Logo"
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex" role="search">
              <ul class="navbar-nav mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to= {isLoggedIn ? "/dashboard" : "/" }>
                    Home
                  </Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link active" to={"/about"}>
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to={"/product"}>
                    Product
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to={"/pricing"}>
                    Pricing
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to={"/support"}>
                    Support
                  </Link>
                </li>
                {!isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link active" to="/signup">
                      Signup
                    </Link>
                  </li>
                )}

                {isLoggedIn && (
                  // <li className="nav-item">
                  //   <button
                  //     className="nav-link btn btn-link active"
                  //     style={{ textDecoration: "none" }}
                     
                  //   >
                  //     Logout
                  //   </button>
                  // </li>

                   <li className="nav-item">
                    <Link className="nav-link active" to="/signup"  onClick={handleLogout}>
                       Logout
                    </Link>
                  </li>
                )}
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default TopNav;
