const express = require("express");
const router = express.Router();
const getCPUUtilization = require("../startup/amazon");

//GET CPU usage
router.get("", async (req, res) => {
  const data = req.body;
  const { IP, timePeriod, interval } = data;
  console.log({ IP, timePeriod, interval });
  getCPUUtilization(IP, timePeriod, interval);
  res.send(data);
});

exports.cpuData = router;
