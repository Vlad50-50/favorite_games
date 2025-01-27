const os = require('os');
const http = require('http');
const path = require('path');
const fs = require('fs');
const INDEX_HTML = fs.readFileSync(path.join(__dirname, "statick", "index.htm"));
const STYLE_CSS  = fs.readFileSync(path.join(__dirname, "statick", "style.css"));
const SCRIPT_JS  = fs.readFileSync(path.join(__dirname, "statick", "script.js"));

function getLocalIp() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const net of interfaces) {
      if (
        net.family === 'IPv4' &&
        !net.internal &&
        (interfaceName.toLowerCase().includes('wifi') || interfaceName.toLowerCase().includes('беспроводная'))
      ) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const hostname = getLocalIp();
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    switch (req.url) {
      case '/': return res.end(INDEX_HTML);
      case '/style.css' : return res.end(STYLE_CSS);
      case '/script.js' : return res.end(SCRIPT_JS);
      case '/api/emails' : return showAdress(req, res);
    }
  }
  return res.end("Error 404");
});

server.listen(port, () => {
  console.log(`Сервер запущено на http://${hostname}:${port}/`);
});

function showAdress(req, res) {    
    const email = req.headers["email"];
    if (!email) res.end();
    if (!email.includes("@gmail.com") || !email.includes("@icloud.com")) res.end();
    console.log(email);
    res.end();
}