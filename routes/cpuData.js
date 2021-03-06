const express = require("express");
const router = express.Router();
const getCPUUtilization = require("../startup/amazon");

// CPU usage
router.post("", async (req, res) => {
  const data = req.body;
  const { instanceID, startTime, period } = data;
  try {
    const CPUUtilization = await getCPUUtilization(
      instanceID,
      startTime,
      period
    );
    if (CPUUtilization?.Datapoints) res.send(CPUUtilization.Datapoints);
  } catch (e) {
    // else res.sendStatus(400);
  }
});

exports.cpuData = router;
