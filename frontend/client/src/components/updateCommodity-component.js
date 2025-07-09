import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommodityService from "../services/commodity.service";
import "./css/Detail.css";

const UpdateCommodityComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // 抓網址上的商品 id

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    // 取得原本商品資料
    CommodityService.getSingleCommodity(id)
      .then((res) => {
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch((err) => {
        console.log("載入商品資料失敗：", err);
      });
  }, [id]);

  const handleChangeButton = () => {
    CommodityService.patch(id, title, description, price)
      .then(() => {
        alert("編輯成功！");
        navigate("/edit");
      })
      .catch((e) => {
        console.log("編輯失敗：", e);
      });
  };

  return (
    <div className="bg-threeSection">
      <div
        className="container py-5"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h2>編輯商品</h2>
        <div className="mb-3">
          <label>商品標題</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="輸入商品名稱"
          />
        </div>

        <div className="mb-3">
          <label>商品描述</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows="3"
            placeholder="輸入商品描述"
          />
        </div>

        <div className="mb-3">
          <label>商品價格</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            placeholder="輸入價格"
          />
        </div>

        <button onClick={handleChangeButton} className="btn btn-primary">
          送出商品
        </button>
      </div>
    </div>
  );
};

export default UpdateCommodityComponent;
