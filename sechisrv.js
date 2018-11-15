const express = require('express');
const fetch = require('node-fetch');

const port = 4002;

const app = express();

const storage= [];

app.get('/', (req, res) => {

    setInterval(() => {

        if(storage.length>=10)
        {
            storage.splice(9,1);
        }

        storage.unshift({time:'',secret:''});

        Promise.all([
            getTimeServer(),
            getSecret()
        ])
            .then(results => {
                console.log(storage);
                console.log('content: '+storage.length);
            })
            .catch(err => console.error(err));
    },5000);

    res.json(storage);

});

// Return the value of the object with the id params.id
app.get('/:id', (req, res) => {

    // Param must be a numeric between 1 and 10
    if(req.params.id < 0 || req.params.id > 10 || !Number.isInteger(parseInt(req.params.id)))
    {
        //param wrong
        res.sendStatus(400);
    }
    else if(storage.length < req.params.id)
    {
        // too low entries in the array
        res.sendStatus(400);
    }
    else
    {
        console.log(req.params.id);
        res.json(storage[req.params.id]);
    }
});



app.listen(port, () => {
    console.log(`Listening on ${port}`)
});


function getTimeServer(){
    return fetch('http://localhost:4000', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => {
            response.json()
                .then(promise => {
                    storage[0].time=promise.time;
                })
                .catch(err => {
                    storage[0].time='ERROR';
                    console.error(err);
                });
        });
}


function getSecret(){
    return fetch('http://localhost:4001/secret', {
        method: 'GET',
    })
        .then(response => {
            response.json()
                .then(promise => {
                    storage[0].secret=promise;
                })
                .catch(err => {
                    storage[0].secret='ERROR';
                    console.error(err);
                });
        });
}

