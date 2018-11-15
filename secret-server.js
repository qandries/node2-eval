const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const { base64encode, base64decode } = require('nodejs-base64');
const cors = require('cors');
const port = 4001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/secret', (req, res) => {
    let secret;
    fs.readFile('./data/secret.txt', 'utf8')
        .then(data => {
            secret = base64decode(data);
            res.json(secret)
        })
        .catch(err => {
            res.send('ERROR');
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
            res.send('ERROR');
            console.log(err)
        });
});


app.listen(port, () => {
    console.log(`Listening on ${port}`)
});

