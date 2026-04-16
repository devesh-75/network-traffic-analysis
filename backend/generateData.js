const fs = require("fs");

// Realistic IP pools (based on your screenshots)
const googleIPs = ["142.250.67.193", "142.250.183.14", "142.250.200.101"];
const cloudflareIPs = ["104.18.39.21", "104.19.194.29", "104.18.86.42"];
const otherIPs = ["172.66.154.160", "151.101.2.217", "34.95.44.106"];
const internalIPs = ["10.207.17.67", "10.207.17.85"];

const suspiciousPorts = [4444, 5555, 6666, 9999, 12345];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomLocal() {
  return `10.207.17.${Math.floor(Math.random() * 200)}`;
}

let data = "source_ip,destination_ip,port,protocol,bytes,packets,status\n";

// 🔹 Normal Traffic (500 rows)
for (let i = 0; i < 500; i++) {
  let destPool = [...googleIPs, ...cloudflareIPs, ...otherIPs];

  let protocolType = Math.random();

  let port, protocol;

  if (protocolType < 0.7) {
    port = 443;
    protocol = "HTTPS";
  } else if (protocolType < 0.9) {
    port = 53;
    protocol = "DNS";
  } else {
    port = 80;
    protocol = "HTTP";
  }

  data += `${randomLocal()},${random(destPool)},${port},${protocol},${Math.floor(Math.random()*20000)+200},${Math.floor(Math.random()*200)+1},normal\n`;
}

// 🔹 UDP (multicast like your screenshot)
for (let i = 0; i < 30; i++) {
  data += `${randomLocal()},239.255.255.250,1900,UDP,${Math.floor(Math.random()*2000)+200},${Math.floor(Math.random()*20)+1},normal\n`;
}

for (let i = 0; i < 30; i++) {
  data += `${randomLocal()},224.0.0.252,5355,UDP,${Math.floor(Math.random()*1000)+100},${Math.floor(Math.random()*10)+1},normal\n`;
}

// 🔹 Suspicious Traffic (70 rows)
for (let i = 0; i < 70; i++) {
  data += `${randomLocal()},${random(["malicious_ip", "unknown_ip"])},${random(suspiciousPorts)},TCP,${Math.floor(Math.random()*8000000)+100000},${Math.floor(Math.random()*15000)+1000},suspicious\n`;
}

// 🔹 High Traffic Attacks (extra realistic)
for (let i = 0; i < 20; i++) {
  data += `${randomLocal()},${random(googleIPs)},443,HTTPS,${Math.floor(Math.random()*10000000)+500000},${Math.floor(Math.random()*20000)+5000},suspicious\n`;
}

fs.writeFileSync("traffic.csv", data);

console.log("Realistic traffic.csv generated (matches Capsa patterns)");