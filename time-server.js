const express = require('express');

const port = 4000;

const app = express();


/*app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/time_server/index.html')
});*/

// Send Time 00:00:00 in blue
app.get('/', function (req, res) {
    const body = 'text';
    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    secondes = date.getSeconds();
    time = `${hours}:${minutes}:${secondes}`;

    res.send(`    
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Time Server</title>
        </head>
        <body>
            <span style="color: blue">${time}</span>
        </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})