const express = require("express");
const config = require("config");
const app = express();

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
