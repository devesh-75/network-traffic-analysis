# 🚀 Network Traffic & Suspicious Activity Analysis using Capsa

## 📌 Project Description
This project captures live network traffic using Capsa and analyzes it to detect normal and suspicious activities. The data is processed using a Node.js backend and visualized through a web dashboard.

---

## ⚙️ System Architecture

1. Live Network Traffic
2. Capsa Capture & Export (CSV)
3. Node.js Backend Processing
4. REST API (JSON)
5. Web Dashboard (Frontend)

---

## 🛠️ Technologies Used

- Capsa (Network Packet Analyzer)
- Node.js (Backend)
- HTML, CSS, JavaScript (Frontend)
- CSV Dataset

---

## 📊 Features

- Real-time network traffic capture
- TCP conversation analysis
- Protocol analysis (HTTP, HTTPS, DNS, TCP, UDP)
- Suspicious activity detection
- Interactive dashboard visualization

---

## 🔍 Suspicious Activity Detection

The system identifies suspicious behavior based on:

- High packet count in short duration
- Unknown IP addresses
- Repeated connections
- Unusual ports or protocols
- Abnormal traffic spikes

---

## 📁 Project Structure


network-traffic-analysis/
├── backend/
│ ├── traffic.csv
│ ├── server.js
├── frontend/
│ ├── index.html
│ ├── script.js


---

## ▶️ How to Run

1. Capture network data using Capsa
2. Export data as CSV
3. Place CSV in backend folder
4. Run backend server:

node server.js

5. Open frontend dashboard in browser

---

## 📷 Output Screenshots

### 🔹 Capsa Dashboard
![Capsa Dashboard](https://github.com/devesh-75/network-traffic-analysis/blob/main/Screenshot%202026-03-28%20232337.png?raw=true)

### 🔹 Web Dashboard
![Web Dashboard](https://github.com/devesh-75/network-traffic-analysis/blob/main/Screenshot%202026-04-16%20113041.png?raw=true)

---

## 📌 Conclusion

This project helps in understanding network behavior and detecting suspicious activities using packet-level analysis.

---
