const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const { base64encode, base64decode } = require('nodejs-base64');
const port = 4001;
const app = express();
app.use(bodyParser.json());

app.get('/secret', (req, res) => {
    let secret;
    fs.readFile('./data/secret.txt', 'utf8')
        .then(data => {
            secret = base64decode(data);
            res.json(secret)
        })
        .catch(err => {
            console.log(err)
        });
});

app.put('/secret', (req, res) => {
    let secretUpdate = req.body.secretUpdate;
    const secretUpdateEncode = base64encode(secretUpdate);
    fs.outputFile('./data/secret.txt', secretUpdateEncode)
        .then(() => {
            console.log("Success");
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err)
        });
});

app.use('/data', express.static(__dirname + '/data'));

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});

