import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommodityService from "../services/commodity.service";

const PostCommodityComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [message, setMessage] = useState("");

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const postCommodity = () => {
    CommodityService.post(title, description, price)
      .then(() => {
        window.alert("新商品已創建成功");
        navigate("/commodity");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="bg-threeSection">
      <div className="container py-5 ">
        <div style={{ padding: "3rem", color: "white" }}>
          {!currentUser && (
            <div>
              <p>在發布商品之前，您必須先登錄。</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleTakeToLogin}
              >
                帶我進入登錄頁面。
              </button>
            </div>
          )}
          {currentUser && currentUser.user.role !== "business" && (
            <div>
              <p>只有講師可以發布新商品。</p>
            </div>
          )}
          {currentUser && currentUser.user.role == "business" && (
            <div className="form-group">
              <label htmlFor="exampleforTitle">商品標題：</label>
              <input
                name="title"
                type="text"
                className="form-control"
                id="exampleforTitle"
                onChange={handleChangeTitle}
              />
              <br />
              <label htmlFor="exampleforContent">內容：</label>
              <textarea
                className="form-control"
                id="exampleforContent"
                aria-describedby="emailHelp"
                name="content"
                onChange={handleChangeDesciption}
              />
              <br />
              <label htmlFor="exampleforPrice">價格：</label>
              <input
                name="price"
                type="number"
                className="form-control"
                id="exampleforPrice"
                onChange={handleChangePrice}
              />
              <br />
              <button className="btn btn-primary" onClick={postCommodity}>
                交出表單
              </button>
              <br />
              <br />
              {message && (
                <div className="alert alert-warning" role="alert">
                  {message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCommodityComponent;
