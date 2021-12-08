const {
  CloudWatchClient,
  ListMetricsCommand,
  GetMetricDataCommand,
  GetMetricStatisticsCommand,
} = require("@aws-sdk/client-cloudwatch");
const config = require("config");

const AWS_ACCESS_KEY_ID = config.get("AWS_ACCESS_KEY_ID");
const AWS_SECRET_ACCESS_KEY = config.get("AWS_SECRET_ACCESS_KEY");
const region = config.get("region");

const cwClient = new CloudWatchClient({
  region: region,
});

const startTime = new Date(Date.now() - 3600000);
const now = new Date();
const params = {
  Namespace: "AWS/CPUUtilization",
  MetricName: "CPUUtilization",
  Period: 60,
  Unit: "Percent",
  StartTime: startTime,
  EndTime: now,
  Statistics: ["Maximum", "Minimum", "Average"],
};

const getCPUUtilization = async (IP, timePeriod, interval) => {
  try {
    const data = await cwClient.send(new GetMetricStatisticsCommand(params));
    console.log("Success. Metrics:", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getCPUUtilization;
