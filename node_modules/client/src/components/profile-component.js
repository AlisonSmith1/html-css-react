import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import "./css/style.css";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div className="bg-threeSection">
      <div className="container py-5 ">
        <div
          className="container py-5 "
          style={{
            border: "2.5px solid gray",
            borderRadius: "10px",
          }}
        >
          {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
          {currentUser && (
            <div style={{ fontSize: "25px", color: "white" }}>
              <h2>個人檔案：</h2>

              <table style={{ margin: "30px" }}>
                <tbody>
                  <tr>
                    <td>
                      <strong>姓名：{currentUser.user.username}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>用戶ID:{currentUser.user._id}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>電子信箱:{currentUser.user.email}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>身份:{currentUser.user.role}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
