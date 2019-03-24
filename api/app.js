const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {BaseError} = require('./utils/errors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Initialize Database
if( process.env.NODE_ENV !== 'test') {
    require('./db/index');
}


const itemsCtrl = require('./controllers/items-ctrl')

app.use('/items', itemsCtrl);

// Base route
app.get('/', function(req, res){
    res.send(`<h1>Todo App</h1>`);
});
app.get('/status', function(req, res){
   res.send({status: 'up'});
});


app.use(function (err, req, res, next) {
    if ( err instanceof BaseError) {
        res.status(err.httpCode).send(err.toJson());
    } else {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    }
});

app.listen(3000, () => {
    console.log('Up and running on port 3000\n access: localhost:3000 and localhost:3000/status');
});

module.exports = app;