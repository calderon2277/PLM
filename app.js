require('dotenv').config();
console.clear();

// ---------------------------------- //
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')

// Database Connection
mongoose.connect(process.env.URLDB)
    .then(() => {
        console.log('¡Connection Successfully!')
    });


// Initialize the application
const app = express();


// Middlewares
app.use('/static', express.static(__dirname + '/reportes'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.set('trust proxy', true);
app.use(cors());

// Cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


//Routes
app.use(process.env.ROUTE, require(process.env.FILEROUTE));

// Run the server
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});