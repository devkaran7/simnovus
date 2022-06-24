import { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  async function loginHandler(event) {
    event.preventDefault();
    let response;
    try {
      response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      return alert("Something went wrong!");
    }
    const data = await response.json();
    if (data.user) {
      sessionStorage.setItem("jwtToken", data.user);
      history.push("/dashboard");
    } else {
      alert("Please check your username and password");
    }
  }
  return (
    <Card className={classes.container}>
      <h1 className="centered">Login</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={usernameHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
