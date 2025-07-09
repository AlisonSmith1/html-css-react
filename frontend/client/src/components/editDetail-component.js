import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommodityService from "../services/commodity.service";
import "./css/Detail.css";

const EditDetailComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // 抓網址上的 id
  const [commodity, setCommodity] = useState(null);

  const handlePatchButton = (commodityId) => {
    navigate(`/update/${commodityId}`);
  };

  const handleDeleteButton = async () => {
    const confirmDelete = window.confirm("確定要刪除這個商品嗎？");

    if (confirmDelete) {
      try {
        // 發送 DELETE 請求刪除商品
        CommodityService.delete(id);

        // 刪除成功後，導航回商品列表頁
        alert("商品已刪除！");
        navigate("/edit");
      } catch (error) {
        console.error("刪除失敗：", error);
        alert("刪除失敗，請稍後再試");
      }
    }
  };

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
    <div className="bg-threeSection">
      <div className="commodity-detail-container container py-5 ">
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

            {/* 編輯和刪除 */}
            <div className="mt-4">
              <button
                onClick={() => handlePatchButton(commodity._id)}
                className="btn btn-primary w-100"
              >
                編輯資訊
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleDeleteButton(commodity._id)}
                className="btn btn-primary w-100"
              >
                刪除商品
              </button>
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
    </div>
  );
};

export default EditDetailComponent;
