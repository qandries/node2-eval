const express = require('express');
const cors = require('cors');
const port = 8000;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/static', express.static(__dirname + '/data'));
app.use('/client', express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});