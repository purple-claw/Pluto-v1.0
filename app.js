const express = require('express');
const morgan = require('morgan');
const credRoute = require('./routes/credRoutes');
const userRoute = require('./routes/authRoutes');
const path = require('path');

const app = express();

//Middleware Morgan for Development Related Logs
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(`${__dirname}/public`));

//Route to render Register Form
app.get('/auth/register', (req, res) => {
    res.render('register');
});

//Route to render Login Page
app.get('/login', (req, res) => {
    res.render('login');
});

//Routes 
app.use('/api/v1/creds',credRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/', userRoute);

module.exports = app;
