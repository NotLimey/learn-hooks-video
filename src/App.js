import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import useUser from "./useUser";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken } = useUser();

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios("https://localhost:5001/identity/login", {
      method: "POST",
      data: {
        userName,
        password,
        rememberMe: false,
      },
    });
    if (res.status === 200) {
      storeToken(res.data.token)
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

function App() {
  const { user } = useUser();

  return (
    <div>
      <div className="App">
        <h2>Login</h2>
        <Login />
      </div>
      {user && <div>
        <p>Username: {user.userName}</p>
        <p>Email: {user.email}</p>
      </div>}
    </div>
  );
}

export default App;
