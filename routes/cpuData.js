const express = require("express");
const router = express.Router();
const getCPUUtilization = require("../startup/amazon");

//GET CPU usage
router.get("", async (req, res) => {
  const data = req.body;
  const { IP, startTime, period } = data;

  const CPUUtilization = await getCPUUtilization(IP, startTime, period);
  res.send(CPUUtilization.Datapoints);
});

exports.cpuData = router;
