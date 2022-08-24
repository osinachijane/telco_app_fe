import axios from "axios";
const API_URL = process.env.REACT_APP_MONO_API_URL;

/*eslint-disable import/no-anonymous-default-export */
export default {
  url: API_URL,
  headers(session_id) {
    let header = {};
    header["Accept"] = "application/json";
    header["Content-Type"] = "application/json";
    header["mono-sec-key"] = process.env.REACT_APP_MONO_SK;
    header["x-session-id"] = session_id;

    return header;
  },

  postLogin(data) {
    return axios({
      method: "post",
      url: `${this.url}/v1/telecom/auth`,
      headers: this.headers(),
      data,
    });
  },
  postVerifyOtp(otp, session_id) {
    return axios({
      method: "post",
      url: `${this.url}/v1/telecom/verify`,
      headers: this.headers(session_id),
      data: {
        otp,
      },
    });
  },
  postAccountId(code) {
    return axios({
      method: "post",
      url: `${this.url}/account/auth`,
      headers: this.headers(),
      data: {
        code,
      },
    });
  },
  getAccountData(id) {
    return axios({
      method: "get",
      url: `${this.url}/accounts/${id}`,
      headers: this.headers(),
    });
  },
  getBalances(id) {
    return axios({
      method: "get",
      url: `${this.url}/accounts/${id}/balances`,
      headers: this.headers(),
    });
  },
  getTransactions(id) {
    return axios({
      method: "get",
      url: `${this.url}/accounts/${id}/transactions`,
      headers: this.headers(),
    });
  },
};
