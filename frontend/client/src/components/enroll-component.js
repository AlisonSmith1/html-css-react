import React, { useEffect, useState } from "react";
import "./css/style.css";
import { useNavigate } from "react-router-dom";
import CommodityService from "../services/commodity.service";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CommodityService.getCommodityByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleEnroll = (e) => {
    CommodityService.enroll(e.target.id)
      .then(() => {
        window.alert("商品註冊成功!! 重新導向到商品頁面。");
        navigate("/commodity");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="bg-threeSection">
      <div style={{ padding: "3rem" }}>
        {!currentUser && (
          <div>
            <p>您必須先登入才能開始註冊商品。</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleTakeToLogin}
            >
              回到登入頁面
            </button>
          </div>
        )}
        {currentUser && currentUser.user.role == "business" && (
          <div>
            <h1>只有買家才能夠註冊商品</h1>
          </div>
        )}
        {currentUser && currentUser.user.role == "customer" && (
          <div className="search input-group mb-3">
            <input
              type="text"
              className="form-control"
              onChange={handleChangeInput}
            />
            <button onClick={handleSearch} className="btn btn-primary">
              搜尋商品
            </button>
          </div>
        )}
        {currentUser && searchResult && searchResult.length != 0 && (
          <div>
            <p style={{ color: "white" }}>這是我們從API返回的數據:</p>
            {searchResult.map((commodity) => {
              return (
                <div
                  key={commodity._id}
                  className="card"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">商品名稱:{commodity.title}</h5>
                    <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                      商品描述: {commodity.description}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      購買人數:
                      {commodity.customers.length}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      商品價格: {commodity.price}
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      賣家: {commodity.business.username}
                    </p>

                    <a
                      href="#"
                      id={commodity._id}
                      className="card-text btn btn-primary"
                      onClick={handleEnroll}
                    >
                      註冊商品
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollComponent;
