//all requiring modules
let app = require('express')();
let fs = require('fs');
let path = require('path');
let https = require('https');
var ExpressPeerServer = require('peer').ExpressPeerServer;//express peer server
let cors = require('cors');
app.use(cors());

//option for certificate and key
var options = {
    key: fs.readFileSync(path.resolve(__dirname, '../resources/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../resources/cert.pem'))
};

//debugging option
var options1 = {
    debug: true
}

//create an server https server for peerjs
var server = https.createServer(options, app);
app.use('/peerjs', ExpressPeerServer(server, options1));
server.listen(8081);




