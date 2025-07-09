import React, { useState } from "react";
import "./css/style.css";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功，您現在將被重新導向到個人資料");
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div className="bg-threeSection">
      <div
        style={{
          position: "relative",
        }}
      >
        <div className="container py-5 ">
          {message && <div className="alert alert-danger">{message}</div>}
          <div>
            <label htmlFor="email" style={{ color: "white" }}>
              電子信箱:
            </label>
            <input
              onChange={handleEmail}
              type="text"
              className="form-control"
              name="email"
            ></input>
          </div>
          <div>
            <label htmlFor="password" style={{ color: "white" }}>
              密碼:
            </label>
            <input
              onChange={handlePassword}
              type="text"
              className="form-control"
              name="password"
            ></input>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleLogin}
              type="submit"
              style={{ borderRadius: "5px" }}
            >
              <span>會員登入</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
