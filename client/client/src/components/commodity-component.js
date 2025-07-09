import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommodityService from "../services/commodity.service";
import "./css/style.css";

const CommodityComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [commodityData, setCommodityData] = useState(null);
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleButton = (commodityId) => {
    navigate(`/commodity/${commodityId}`);
  };
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "business") {
        CommodityService.get(_id)
          .then((data) => {
            console.log(data);
            setCommodityData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "customer") {
        CommodityService.getEnrolledCommodity(_id)
          .then((data) => {
            console.log(data);
            setCommodityData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div className="bg-threeSection">
      <div className="container py-5">
        {!currentUser && (
          <div>
            <p>您必須先登入才能看到商品</p>
            <button onClick={handleTakeToLogin}>回到登入頁面 </button>
          </div>
        )}
        {currentUser && currentUser.user.role == "business" && (
          <div>
            <h1>歡迎來到賣家的商品頁面。</h1>
          </div>
        )}
        {currentUser && currentUser.user.role == "customer" && (
          <div>
            <h1>歡迎來到買家的商品頁面。</h1>
          </div>
        )}
        {currentUser && commodityData && commodityData.length != 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {commodityData.map((commodity) => {
              return (
                <div
                  className="card"
                  style={{ width: "18rem", margin: "1rem" }}
                >
                  <button
                    onClick={() => handleButton(commodity._id)}
                    style={{ border: "none", padding: 0, background: "none" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">商品名稱:{commodity.title}</h5>
                      <p
                        style={{ margin: "0.5rem 0rem" }}
                        className="card-text"
                      >
                        描述:
                        {commodity.description}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        商品價格: {commodity.price}
                      </p>
                      <p style={{ margin: "0.5rem 0rem" }}>
                        賣家: {commodity.business.username}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommodityComponent;
