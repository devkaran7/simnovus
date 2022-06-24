const express = require("express");
const Influx = require("influx");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const http = require("http");
const cron = require("node-cron");
const socketio = require("socket.io");
const getData = require("./func");

const app = express();
const server = http.createServer(app);
const influx = new Influx.InfluxDB("http://localhost:8086/manisha");

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["get", "post"],
  },
});

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(cors());
app.use(
  express.json({
    extended: false,
  })
);
app.use(express.static(publicDirectoryPath));

var SOCKET_LIST = {};

var socket1;
io.on("connection", (socket) => {
  SOCKET_LIST[socket.id] = socket;
  socket1 = socket;
  console.log("New WebSocket connection");
  socket.emit("send hello", "hello");
});

app.post("/api/autopost", async (req, res) => {
  cron.schedule("*/2 * * * * *", async () => {
    // influx query
    try {
      const datapoint = getData();
      await influx.writePoints(
        [
          {
            measurement: "sensors3",
            tags: {
              sensor_id: "climax_1",
              user_location: "greenhouse",
            },
            fields: {
              is_fahrenhiet: false,
              temperature: datapoint.temperature1,
            },
          },
        ],
        {
          database: "manisha",
          precision: "ms",
        }
      );
      await influx.writePoints(
        [
          {
            measurement: "sensors3",
            tags: {
              sensor_id: "climax_2",
              user_location: "greenhouse",
            },
            fields: {
              is_fahrenhiet: false,
              temperature: datapoint.temperature2,
            },
          },
        ],
        {
          database: "manisha",
          precision: "ms",
        }
      );

      let data1, data2;
      try {
        data1 = await influx.query(
          `select * from sensors3 where sensor_id='climax_1'`
        );
        data2 = await influx.query(
          `select * from sensors3 where sensor_id='climax_2'`
        );
      } catch (e) {
        return res.json({ message: e.message });
      }

      socket1.emit("data", data1, data2);
    } catch (e) {
      return res.json({ message: e.message });
    }
    console.log("done");
  });

  res.status(201).json({ message: "success!" });
});

app.post("/api/login", (req, res) => {
  const location = path.join(__dirname, "data", "userdata.json");
  const content = JSON.parse(fs.readFileSync(location));
  const isvalid = content.find((data) => {
    return (
      data.username === req.body.username && data.password === req.body.password
    );
  });
  if (isvalid) {
    const token = jwt.sign(
      {
        username: req.body.username,
      },
      "topsecret"
    );
    res.json({ status: "ok", user: token });
  } else {
    res.json({ status: "error" });
  }
});

server.listen(1337, () => {
  console.log("server started on 1337");
});
