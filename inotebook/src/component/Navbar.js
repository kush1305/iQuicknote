import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  let history=useNavigate();
  const handleLogout=()=>{

    localStorage.removeItem('token');
    history('/login')

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            iQuicknote
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="\navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-1">
                <Link
                  className="nav-Link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item px-1">
                <Link className="nav-Link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              <Link className="btn btn-outline-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-success mx-1" to="/signup">
                Signup
              </Link>
            </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
