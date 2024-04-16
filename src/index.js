const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

const ports = {
    http: 8080,
    https: 8443
}

//Disable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.get("/", (req, res) => {
    res.send("OK");
});

// Read SSL certificate and key files
const options = {
    key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

// Create HTTPS server
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);


httpServer.listen(ports.http);
httpsServer.listen(ports.https);
console.log(`Server running on http://localhost:${ports.http} and https://localhost:${ports.https}`);