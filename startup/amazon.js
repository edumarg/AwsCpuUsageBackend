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

const buildParams = (instanceID, startTime, period) => {
  const start = startTime
    ? new Date(startTime)
    : new Date(Date.now() - 3600000);
  const now = new Date();
  const params = {
    Dimensions: [
      {
        Name: "InstanceId",
        // 0a86544205999b1cf
        Value: `i-${instanceID}`,
      },
    ],
    Namespace: "AWS/EC2",
    MetricName: "CPUUtilization",
    Period: period || 60,
    Unit: "Percent",
    StartTime: start,
    EndTime: now,
    Statistics: ["Average"],
  };
  return params;
};

const getCPUUtilization = async (instanceID, startTime, period) => {
  const params = buildParams(instanceID, startTime, period);
  try {
    const data = await cwClient.send(new GetMetricStatisticsCommand(params));
    console.log("Success. Metrics:", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getCPUUtilization;
