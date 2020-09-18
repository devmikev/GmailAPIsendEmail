require("dotenv").config();
const express = require("express");
const app = express();
const port = 1234;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/test", (req, res) => {
  console.log("body", req.body);
  const { jwt, accessToken, to, subject } = req.body;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });
  const str = `To: ${to}
Subject: ${subject}
  
line1
line2`;
  console.log("str", str);
  const raw = new Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  gmail.users.messages.send(
    {
      userId: "dummy.devmv@gmail.com",
      resource: {
        raw,
      },
    },
    (err, result) => {
      console.log("err", err);
      console.log("result", result);
      res.send(JSON.stringify(result));
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
