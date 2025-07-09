import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommodityService from "../services/commodity.service";
import "./css/Detail.css";

const CommodityDetailComponent = ({ currentUser, setCurrentUser }) => {
  const { id } = useParams(); // 抓網址上的 id
  const [commodity, setCommodity] = useState(null);

  useEffect(() => {
    CommodityService.getSingleCommodity(id)
      .then((data) => {
        setCommodity(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!commodity) return <div className="loading">載入中...</div>;

  return (
    <div className="commodity-detail-container container py-5">
      <div className="row">
        {/* 商品圖片區域 */}
        <div className="col-md-6">
          <div className="commodity-image">
            <img
              src={commodity.image || "/default-image.png"} // 預設圖片
              alt={commodity.title}
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* 商品詳情區域 */}
        <div className="col-md-6">
          <h2 className="commodity-title">{commodity.title}</h2>
          <p className="commodity-description">{commodity.description}</p>
          <p className="commodity-price">
            <strong>價格:</strong> ${commodity.price}
          </p>
          <p className="commodity-seller">
            <strong>賣家:</strong> {commodity.business?.username || "無資料"}
          </p>

          {/* 可能的購買按鈕或聯絡賣家按鈕 */}
          <div className="mt-4">
            <button className="btn btn-primary w-100">聯絡賣家</button>
          </div>
        </div>
      </div>

      {/* 其他可能的區塊，比如評論區 */}
      <div className="mt-5">
        <h4>顧客評論</h4>
        {/* 顯示評論區塊，這裡可以根據實際需要展示 */}
        <div className="comments-section">{/* 評論內容 */}</div>
      </div>
    </div>
  );
};

export default CommodityDetailComponent;
