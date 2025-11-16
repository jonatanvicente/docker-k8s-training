const fs = require("fs");
const path = "/data/shared.log";

function writeLog() {
  const timestamp = new Date().toISOString();
  const line = `${timestamp} Worker running...\n`;

  try {
    fs.appendFileSync(path, line);
    console.log("Log written:", line.trim());
  } catch (err) {
    console.error("Error writing log:", err);
  }
}

setInterval(writeLog, 3000);
writeLog(); // write immediately on start

