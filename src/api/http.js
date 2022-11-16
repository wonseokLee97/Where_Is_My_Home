import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://192.168.28.51:80/", // 변경
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
