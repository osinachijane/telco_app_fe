import { useState } from "react";
// import Navbar from "../components/Navbar";

const User = () => {
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState("");
  const [message, setMessage] = useState("");

  const secret_key = process.env.REACT_APP_MONO_SK;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.withmono.com/v1/telecom/auth", {
        method: "POST",
        headers: {
          "mono-sec-key": secret_key,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: phone,
          email: provider,
        }),
      });
      // const resJson = await response.json();
      if (response.status === 200) {
        setPhone("");
        setProvider("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          value={provider}
          placeholder="Provider"
          onChange={(e) => setProvider(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
};

export default User;
