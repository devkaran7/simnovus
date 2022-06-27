import { useState } from "react";
import { useHistory } from "react-router-dom";
import isAuth from "../isAuth";
import classes from "./Dashboard.module.css";
import Chart from "../components/dashboard/Chart";

import { io } from "socket.io-client";

const socket = io("http://localhost:1337");

socket.on("send hello", (message) => {
  console.log(message);
});

const Dashboard = () => {
  const history = useHistory();
  if (!isAuth()) {
    history.replace("/login");
  }

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  socket.on("data", (data1, data2) => {
    setData1(data1);
    setData2(data2);
  });

  const postAutoDataHandler = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/autopost", {
        method: "post",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error();
      }

      console.log("pushing data started");
    } catch (e) {
      alert("error!");
    }
  };

  return (
    <>
      <div className="centered">
        <h1> Dashboard </h1>
      </div>
      <div className="centered">
        <button className={`btn ${classes.item}`} onClick={postAutoDataHandler}>
          Trigger Data
        </button>
      </div>
      <div className="centered">
        <Chart data1={data1} data2={data2} />
      </div>
    </>
  );
};

export default Dashboard;
