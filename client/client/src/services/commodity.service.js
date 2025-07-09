import axios from "axios";
const API_URL = "https://secondhandclothesserve.onrender.com/api/commodity";

class CommodityService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  //使用買家id，找到買家購買的商品
  getEnrolledCommodity(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/customers/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  //使用商家id，找到商家擁有的商品
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/businesss/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCommodityByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/enroll/" + _id,
      {},
      { headers: { Authorization: token } }
    );
  }

  getSingleCommodity(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(
      API_URL + "/" + id,

      { headers: { Authorization: token } }
    );
  }

  patch(id, title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/update/" + id,
      { title, description, price },
      {
        headers: { Authorization: token },
      }
    );
  }

  delete(id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/delete/" + id, {
      headers: { Authorization: token },
    });
  }
}

export default new CommodityService();
