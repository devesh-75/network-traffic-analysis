const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());

let trafficData = [];

//  Load CSV
fs.createReadStream("traffic.csv")
  .pipe(csv())
  .on("data", (row) => {
    trafficData.push(row);
  })
  .on("end", () => {
    console.log("CSV Loaded Successfully");
  });


// API 1: Get all data
app.get("/data", (req, res) => {
  res.json(trafficData);
});


// API 2: Detect suspicious activity
app.get("/analyze", (req, res) => {
  let suspicious = trafficData.filter(row => {
    let port = parseInt(row.port);
    let bytes = parseInt(row.bytes);
    let packets = parseInt(row.packets);

    return (
      port > 1024 ||            // unusual ports
      bytes > 500000 ||         // high traffic
      packets > 1000 ||         // packet flood
      row.status === "suspicious"
    );
  });

  res.json({
    total: trafficData.length,
    suspiciousCount: suspicious.length,
    suspiciousData: suspicious
  });
});


//  API 3: Protocol distribution
app.get("/protocols", (req, res) => {
  let count = {};

  trafficData.forEach(row => {
    count[row.protocol] = (count[row.protocol] || 0) + 1;
  });

  res.json(count);
});


// API 4: Top IPs
app.get("/top-ips", (req, res) => {
  let ipCount = {};

  trafficData.forEach(row => {
    ipCount[row.destination_ip] = (ipCount[row.destination_ip] || 0) + 1;
  });

  let sorted = Object.entries(ipCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  res.json(sorted);
});

app.get("/metrics", (req, res) => {
  let total = trafficData.length;

  let suspicious = trafficData.filter(row => {
    return (
      parseInt(row.port) > 1024 ||
      parseInt(row.bytes) > 500000 ||
      parseInt(row.packets) > 1000 ||
      row.status === "suspicious"
    );
  });

  let protocolCount = {};
  trafficData.forEach(row => {
    protocolCount[row.protocol] = (protocolCount[row.protocol] || 0) + 1;
  });

  res.json({
    totalTraffic: total,
    suspiciousCount: suspicious.length,
    suspiciousPercentage: ((suspicious.length / total) * 100).toFixed(2),
    protocolDistribution: protocolCount
  });
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});