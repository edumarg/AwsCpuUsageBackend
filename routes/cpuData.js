const express = require("express");
const router = express.Router();

//GET CPU usage
router.get("", async (req, res) => {
  const data = req.body;
  res.send(data);
});

exports.cpuData = router;
