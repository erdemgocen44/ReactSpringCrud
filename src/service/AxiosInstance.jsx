import axios from "axios";
//backend imizin bağlantı adresini veriyoruz, bu şekilde kisilere erişiyoruz
export default axios.create({
  baseURL: "http://localhost:8080/kisiler",
  headers: {
    "Content-type": "application/json",
  },
});
// axios-http.com/docs/instance adresinde buranın oluşumu var
