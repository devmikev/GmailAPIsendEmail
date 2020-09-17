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

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

app.get("/test", (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CLIENT_SECRET,
    REDIRECT_URI
  );

  const scopes = ["https://mail.google.com/"];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid,
    }),
  });

  request(url, (err, res, body) => {
    console.log("error: ", err);
    console.log("statusCode: ", res && res.statusCode);
    res.send({ url });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
