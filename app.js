const express = require("express"); // https://www.npmjs.com/package/express
const cors = require("cors"); // https://www.npmjs.com/package/cors
const config = require("config"); // www.npmjs.com/package/config
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
