const express = require('express');
const cors = require('cors');
const port = 4000;

const app = express();

app.use(cors());

// Send Time 00:00:00 in blue
app.get('/', function (req, res) {

    date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    secondes = date.getSeconds();

    if(hours < 10)
    {
        hours = '0'+hours;
    }
    if(minutes < 10)
    {
        minutes = '0'+minutes;
    }
    if(secondes < 10)
    {
        secondes = '0'+secondes;
    }

    time = `${hours}:${minutes}:${secondes}`;

    if(req.accepts('text/html') && !req.accepts('application/json'))
    {
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
    }
    else if(req.accepts('application/json'))
    {
        res.json({'time':time});
    }
    else
    {
        res.send(`${time}`);
    }

});

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});