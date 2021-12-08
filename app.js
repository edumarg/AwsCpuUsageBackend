const express = require("express");
const cors = require("cors");
const config = require("config");
const { cpuData } = require("./routes/cpuData");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cpu", cpuData);

if (
  !config.get("AWS_ACCESS_KEY_ID") ||
  !config.get("AWS_SECRET_ACCESS_KEY") ||
  !config.get("region")
) {
  console.log(
    "FATAL ERROR: Either accessID, accessKey or region are not defined.."
  );
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
