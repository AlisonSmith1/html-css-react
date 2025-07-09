import React from "react";
import "./css/style.css";

function homePageComponent() {
  return (
    <div className="bg-threeSection">
      <div style={{ color: "white", padding: 60 }}>
        <h2>輕鬆開始二手衣物買賣</h2>
        <p>
          二手衣物買賣不僅能幫助你省錢，還能為環境出一份力。以下是簡單的步驟，讓你快速上手。
        </p>

        <ul>
          <li>
            <strong>選擇平台：</strong>
            找到可靠的二手衣物交易平台，輕鬆註冊並開始交易。
          </li>
          <li>
            <strong>拍照與描述：</strong>拍下衣物照片並簡單描述，吸引買家。
          </li>
          <li>
            <strong>合理定價：</strong>設置合理價格，確保吸引買家。
          </li>
          <li>
            <strong>簡單交易：</strong>交易完成後，包裝並發貨，簡單又安全。
          </li>
        </ul>

        <h3>買賣二手衣物的好處</h3>
        <ul>
          <li>
            <strong>環保：</strong>減少浪費，延長衣物的使用周期。
          </li>
          <li>
            <strong>省錢：</strong>以較低的價格購得高品質衣物。
          </li>
          <li>
            <strong>獨特：</strong>每件衣物都有其故事，讓你擁有與眾不同的穿著。
          </li>
        </ul>

        <h2>成為賣家，賺取收入</h2>
        <p>
          將不再穿的衣物賣出，不僅讓它們得到新生命，還能幫助你賺取一些額外收入。
        </p>

        <ul>
          <li>
            <strong>輕鬆上架：</strong>拍照並簡單描述，衣物就能上架。
          </li>
          <li>
            <strong>設置價格：</strong>根據衣物狀況設置合理價格。
          </li>
          <li>
            <strong>安全交易：</strong>交易過程簡單，支付安全可靠。
          </li>
        </ul>

        <h3>賣家的好處</h3>
        <ul>
          <li>
            <strong>賺取收入：</strong>將不再需要的衣物變現。
          </li>
          <li>
            <strong>減少浪費：</strong>將衣物賣給需要的人，讓它們得到新生。
          </li>
        </ul>

        <h2>總結</h2>
        <p>
          無論是購買還是出售二手衣物，這是一個環保又實惠的選擇，讓你的舊衣物重新焕發光彩。
        </p>
      </div>
    </div>
  );
}

export default homePageComponent;
