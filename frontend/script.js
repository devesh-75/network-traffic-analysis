// Get analysis data
fetch("http://localhost:5000/analyze")
.then(res => res.json())
.then(data => {
  document.getElementById("total").innerText = data.total;
  document.getElementById("suspicious").innerText = data.suspiciousCount;
});

// Get protocol distribution
fetch("http://localhost:5000/protocols")
.then(res => res.json())
.then(data => {
  new Chart(document.getElementById("protocolChart"), {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
});

// Get top IPs
fetch("http://localhost:5000/top-ips")
.then(res => res.json())
.then(data => {
  let list = document.getElementById("ipList");
  data.forEach(ip => {
    let li = document.createElement("li");
    li.innerText = `${ip[0]} (${ip[1]} connections)`;
    list.appendChild(li);
  });
});