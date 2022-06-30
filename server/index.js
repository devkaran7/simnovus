const express = require("express");
const Influx = require("influx");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const http = require("http");
var cron = require("node-cron");
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
  var i = 0;
  var task = cron.schedule("*/2 * * * * *", async () => {
    // influx query
    try {
      const datapoint = getData();
      await influx.writePoints(
        [
          {
            measurement: "ue_4",
            tags: {
              sensor_id: "sensor_1",
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
            measurement: "ue_4",
            tags: {
              sensor_id: "sensor_2",
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
          `select * from ue_4 where sensor_id='sensor_1'`
        );
        data2 = await influx.query(
          `select * from ue_4 where sensor_id='sensor_2'`
        );
      } catch (e) {
        return res.json({ message: e.message });
      }

      socket1.emit("data", data1, data2);
      i++;
    } catch (e) {
      return res.json({ message: e.message });
    }
    console.log("done");
    if (i == 61 * 60) {
      task.stop();
    }
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

app.post("/api/getslots", async (req, res) => {
  ue_name = req.body.ue_name;

  try {
    const t = await influx.query(
      `select free_slots from ue_info where ue_name='${ue_name}'`
    );

    const t1 = JSON.parse(JSON.stringify(t))[0].free_slots;
    var t2 = JSON.parse(t1);

    res.json({ slots: t2 });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/api/reserve", async (req, res) => {
  ue_name = req.body.ue_name;
  schedule_date = req.body.date;
  schedule_time = +req.body.time;
  const t = await influx.query(
    `select free_slots from ue_info where ue_name='${ue_name}'`
  );

  const t1 = JSON.parse(JSON.stringify(t))[0].free_slots;
  var t2 = JSON.parse(t1);

  const ind = t2.indexOf(schedule_time);

  if (ind > -1) {
    t2.splice(ind, 1);
  }

  var t3 = JSON.stringify(t2);

  const u = await influx.query(
    `select busy_slots from ue_info where ue_name='${ue_name}'`
  );

  const u1 = JSON.parse(JSON.stringify(u))[0].busy_slots;
  var u2 = JSON.parse(u1);
  u2.push(schedule_time);
  var u3 = JSON.stringify(u2);
  await influx.query(`delete from ue_info where ue='${ue_name}'`);

  await influx.writePoints(
    [
      {
        measurement: "ue_info",
        tags: {
          ue: ue_name,
        },
        fields: {
          ue_name: ue_name,
          is_busy: false,
          free_slots: t3,
          busy_slots: u3,
        },
      },
    ],
    {
      database: "manisha",
      precision: "ms",
    }
  );
  res.json({ message: "slot booked" });
});

server.listen(1337, () => {
  console.log("server started on 1337");
});
