import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功!現在您會被導向到首頁。");
    setCurrentUser(null);
  };

  return (
    <div>
      <nav>
        <nav
          className="navbar navbar-expand-lg  fixed-top"
          style={{
            backgroundColor: "#5C4434",
            backgroundColor: "#5C4434",
            paddingTop: "0.2rem",
            paddingBottom: "0.2rem",
          }}
        >
          <div className="container-fluid ">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    style={{ color: "#EADCA6" }}
                    to="/"
                  >
                    首頁
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/register"
                    >
                      註冊會員
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/login"
                    >
                      會員登入
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/profile"
                    >
                      個人頁面
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "business" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/commodity"
                    >
                      商品頁面
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "business" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/postCommodity"
                    >
                      新增商品
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "business" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/edit"
                    >
                      編輯商品
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "customer" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/commodity"
                    >
                      商品頁面
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "customer" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/enroll"
                    >
                      註冊商品
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      onClick={handleLogout}
                      className="nav-link"
                      style={{ color: "#EADCA6" }}
                      to="/"
                    >
                      登出
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
