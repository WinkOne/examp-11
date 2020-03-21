const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./app/users');
const categories = require('./app/categories');
const goods = require('./app/goods');
// const comments = require('./app/comments');

const config = require('./config');


const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());



const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/users', users);
    app.use('/categories', categories);
    app.use('/goods', goods);
    // app.use('/comments', comments);

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port!`)
    })
};

run().catch(e => {
    console.error(e)
});