const express = require("express");
const requestIp = require("request-ip");

const PORT = process.env.PORT || 5000;
const app = express();

app.get("/api/v1/data", (req, res) => {
  const ip = requestIp.getClientIp(req);
  const userAgent = req.headers["user-agent"];

  const response = {
    ip,
    userAgent,
    data: [{
      one: 1,
      two: 2,
    }]
  }
  

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
