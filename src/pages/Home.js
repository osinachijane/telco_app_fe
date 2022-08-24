import React, { useEffect, useState } from "react";
import { GiNetworkBars } from "react-icons/gi";
import { BiCoinStack } from "react-icons/bi";
import {
  AiOutlineNumber,
  AiOutlineFieldNumber,
  AiOutlineUser,
} from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Select from "../components/Input/Select";
import useHome from "../hooks/useHome.hook";
import apiService from "../services/apiService";

const Home = () => {
  const [formData1, setFormData1] = useState({
    phone: "",
    provider: "",
  });
  const [sessionId, setSessionId] = useState("");
  const [otp, setOtp] = useState("");

  const [code, setCode] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountInfo, setAccountInfo] = useState({});
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    form1,
    form2,
    form3,
    overView,
    tranx,
    onNext1,
    onNext2,
    onNext3,
    onNext4,
    onPrev1,
    onPrev2,
    onPrev3,
    reset,
  } = useHome();

  useEffect(() => {
    code && getAccountId(code);
  }, [code]);

  const handleChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const getAccountId = async (code) => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiService.postAccountId(code);
      setAccountId(res.data.id);
      getAccountInfo(res.data.id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const getAccountInfo = async (id) => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiService.getAccountData(id);
      setAccountInfo(res.data.account);
      setLoading(false);
      onNext3();
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const getBalanceDetails = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiService.getBalances(accountId);
      console.log(res.data);
      setLoading(false);
      onNext2();
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const getTransactions = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiService.getTransactions(accountId);
      setData(res.data);
      setLoading(false);
      onNext4();
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const submit1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await apiService.postLogin(formData1);
      setSessionId(res.data.data.session_id);
      setLoading(false);
      onNext1();
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const submit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await apiService.postVerifyOtp(otp, sessionId);
      setLoading(false);
      setCode(res?.data?.data?.code);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <h1 onClick={reset} className="logo">
        TelcoApp.
      </h1>
      <div className="container">
        <div className="home">
          {form1 && (
            <>
              <h1>Welcome to TelcoApp</h1>
              <p>
                Kindly enter your phone number and mobile service provider to
                continue:
              </p>
              <form onSubmit={submit1}>
                {error && <small style={{ color: "red" }}>{error}</small>}
                <Input
                  label="Phone number"
                  name="phone"
                  type="number"
                  value={formData1.phone}
                  onChange={handleChange1}
                />
                <Select
                  name="provider"
                  value={formData1.provider}
                  onChange={handleChange1}
                  label="Provider"
                >
                  <option value="" />
                  <option value="mtn">MTN</option>
                  <option value="airtel">Airtel</option>
                </Select>
                <Button type="submit" label={loading ? "Loading..." : "Next"} />
              </form>
            </>
          )}
          {form2 && (
            <>
              <h1>Enter OTP</h1>
              <p>Kindly enter the OTP that was sent to your phone number:</p>
              <form onSubmit={submit2}>
                {error && <small style={{ color: "red" }}>{error}</small>}
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  label="OTP"
                  type="password"
                />
                <div className="button-wrapper">
                  <Button onClick={onPrev1} type="submit" label="Prev" />
                  <Button
                    type="submit"
                    label={loading ? "Loading..." : "Next"}
                  />
                </div>
              </form>
            </>
          )}
          {overView && (
            <>
              <h1>Overview</h1>
              <p>This is an overview of your MTN account:</p>
              <br />
              {error && <small style={{ color: "red" }}>{error}</small>}
              <div className="overview-wrapper">
                <div className="overview-info">
                  <GiNetworkBars fill="#000" fontSize={22} />
                  <p>
                    <b>Provider:</b> {accountInfo.institution?.name}
                  </p>
                </div>
                <div className="overview-info">
                  <AiOutlineUser fill="#000" fontSize={22} />
                  <p>
                    <b>Account Name:</b> {accountInfo.name}
                  </p>
                </div>
                <div className="overview-info">
                  <AiOutlineNumber fill="#000" fontSize={22} />
                  <p>
                    <b>Mobile number:</b> {accountInfo.accountNumber}
                  </p>
                </div>
                <div className="overview-info">
                  <BiCoinStack fill="#000" fontSize={22} />
                  <p>
                    <b>Main Balance:</b>{" "}
                    {(accountInfo.balance / 100).toLocaleString()}
                  </p>
                </div>
                <div className="overview-info">
                  <BsCurrencyExchange fill="#000" fontSize={22} />
                  <p>
                    <b>Currency:</b> {accountInfo.currency}
                  </p>
                </div>

                <div className="overview-info">
                  <AiOutlineFieldNumber fill="#000" fontSize={22} />
                  <p>
                    <b>BVN:</b> {accountInfo.bvn || "N/A"}
                  </p>
                </div>
                <br />
                <div className="button-wrapper">
                  <Button
                    type="submit"
                    label="Balance Details"
                    onClick={getBalanceDetails}
                    style={{ marginRight: 25 }}
                  />
                  <Button
                    type="submit"
                    label={loading ? "Loading..." : "Transactions"}
                    onClick={getTransactions}
                  />
                </div>
              </div>
            </>
          )}
          {form3 && (
            <>
              <h1>Transaction Balance Data</h1>
              <p>Kindly select the transaction balance data you require:</p>
              <form>
                {error && <small style={{ color: "red" }}>{error}</small>}
                <Select label="Transaction Balance Data">
                  <option>Main Balance</option>
                  <option>Roaming Bundle</option>
                  <option>GoodyBag Social Bundle</option>
                </Select>
                <div className="button-wrapper">
                  <Button
                    onClick={onPrev2}
                    type="submit"
                    label="Prev"
                    style={{ marginRight: 25 }}
                  />
                </div>
              </form>
            </>
          )}
          {tranx && (
            <>
              <h1>Telco Transactions</h1>
              <p>This is an overview of your Telco transactions:</p>
              <br />
              {error && <small style={{ color: "red" }}>{error}</small>}
              {console.log(data)}
              <table>
                <tr>
                  <th>S/N</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Narration</th>
                  <th>Balance</th>
                  <th>Date</th>
                </tr>
                {data.data?.map((tranx, i) => {
                  const formatedDate = new Date(
                    Date.parse(tranx.date)
                  ).toUTCString();
                  return (
                    <tr key={i + 1}>
                      <td>{i + 1}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {tranx.type}
                      </td>
                      <td>{(tranx.amount / 100).toLocaleString()}</td>
                      <td>{tranx.narration}</td>
                      <td>{(tranx.balance / 100).toLocaleString()}</td>
                      <td>{formatedDate}</td>
                    </tr>
                  );
                })}
              </table>
              <br />
              <Button onClick={onPrev3} type="submit" label="Go Back" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
