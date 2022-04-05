// index.js
const { request } = require('express');
const express = require('express'); // importar lib
const { json } = require('express/lib/response');
const app = express(); // instance of express app
const port = 3000; // port for the webservice

app.use(express.json());

// get
app.get('/', (request, result) => {
    
    result.send({'name': 'Tiago'});
    
});

// get id
app.get('/id/', (request, result) => {

    if (request.query.id % 2 == 0)
        result.send({'name': 'Marcelo'});
    else
        result.send({'name': 'Adelaide'});
});

// post
app.post('/int/', (request, result) => {

    var number = request.body.number * 2;

    result.send({'result': `${number}`});

})

app.post('/intq/', (request, result) => {

    var number = request.query.number;

    result.send({'result': number * 2});

})

const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./coudelaria_dwm.db',
    sqlite3.OPEN_READWRITE, (err) => {
        if (err) 
            console.log('Error', err);
        else {
            console.log('Ready');
            start();

        }    
    });

app.get('/cavalos', (request, result) =>  {
    db.all('SELECT * FROM cavalos', (err, rows) => {
        if (err) {
            result.status(400).send({'error': err})
        }
        else {
            result.send(rows);
        }
    })
})

function start() {
    app.listen(port, () => {
        console.log(`Server is listening at ${port}`)
    });
}