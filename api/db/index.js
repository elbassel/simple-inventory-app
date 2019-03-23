const mongoose = require('mongoose');


mongoose.connect('mongodb://database:27017/inventory', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database is connected');
});
