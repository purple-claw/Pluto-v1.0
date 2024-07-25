const express = require('express');
const morgan = require('morgan');
const credRoute = require('./routes/credRoutes');

const app = express();

//Middleware Morgan for Development Related Logs
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());
//app.use(express.static(`${__dirname}/public`));

//Routes 
app.use('/api/v1/creds',credRoute);

module.exports = app;