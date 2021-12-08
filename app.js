const express = require("express");
const cors = require("cors");
const config = require("config");
const { cpuData } = require("./routes/cpuData");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cpu", cpuData);

if (
  !config.get("accessID") ||
  !config.get("accessKey") ||
  !config.get("region")
) {
  console.log(
    "FATAL ERROR: Either accessID, accessKey or region are not defined.."
  );
  process.exit(1);
}

const accessID = config.get("accessID");
const accessKey = config.get("accessKey");
const region = config.get("region");

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
