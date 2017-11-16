const express = require('express');
const https = require('https');
var path = require('path');
const bodyParser = require('body-parser');
const { fork } = require('child_process')

const fs = require('fs');
const cors = require('cors')
const coderunnerConfig = require('../../config').coderunnerConfig;

let app = express();

var options = {
    key: fs.readFileSync(path.resolve(__dirname, coderunnerConfig.resourceKey)),
    cert: fs.readFileSync(path.resolve(__dirname, coderunnerConfig.resourceCert))
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())

/*route to execute a child process*/
app.post('/execute', function(req, res) {
    const fileName = 'out' + Date.now().toString() + '.log';
    const out = fs.openSync('./logs/' + fileName, 'a');
    const compute = fork('coderunner.vm.js', [], {
        stdio: ['ignore', out, out, 'ipc']
    });

    compute.send(req.body.testscript);
    compute.on('message', (testscript, err) => {
        if (err) {
            const output = fs.readFileSync('./logs/' + fileName, "utf8");
            fs.unlink('./logs/' + fileName)
            res.send(output)
        } else {
            const output = fs.readFileSync('./logs/' + fileName, "utf8");
            fs.unlink('./logs/' + fileName)
            res.send(output)
        }
    });
})

// Create HTTPS server.
var server = https.createServer(options, app);
server.listen(coderunnerConfig.PORT, function() {})