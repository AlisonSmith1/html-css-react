import React from "react";
import "./css/style.css"; // 引入 CSS 檔案
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleHomePageOne = () => {
    navigate("/homePage");
  };

  return (
    <main>
      <div className="bg-threeSection">
        <div className="container py-4 ">
          <div
            style={{
              position: "relative",
            }}
          >
            <div className="container-fluid py-3 bg-oneSection">
              <h1>二手衣買賣系統</h1>
              <button
                onClick={handleHomePageOne}
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "0%",
                  background: "transparent",
                  border: "0.5px solid #5C4434",
                  color: "black",
                  padding: "10px 20px",
                  fontSize: "1.5rem",
                  width: "100%",
                  height: "400px",
                  color: "white",
                }}
              >
                了解如何輕鬆買賣二手衣
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div
              style={{
                position: "relative",
              }}
            >
              <div className="container-fluid bg-twoSection">
                <button
                  onClick={handleHomePageOne}
                  style={{
                    position: "absolute",
                    top: "0%",
                    left: "0%",
                    background: "transparent",
                    border: "0.5px solid #5C4434",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    width: "100%",
                    height: "400px",
                    color: "white",
                  }}
                >
                  二手衣不僅環保，還能幫助你省錢
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-5 ">
            <div
              className="bg-fourSection"
              style={{
                position: "relative",
              }}
            >
              <div className="container-fluid">
                <button
                  onClick={handleHomePageOne}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    background: "transparent",
                    border: "0.5px solid #5C4434",
                    padding: "10px 20px",
                    fontSize: "1.2rem",
                    width: "100%",
                    height: "300px",
                  }}
                >
                  成為我們的賣家，讓舊衣物得到新生命
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 頁腳區域 */}
      <footer>&copy; 2025</footer>
    </main>
  );
};

export default HomeComponent;
