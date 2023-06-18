const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Bring routes
const blogRoutes = require('./routes/blog');

// App
const app = express();

// Database
mongoose.connect(process.env.DATABASE_CLOUD, options)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your server or perform any other operations here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`})); // allow all origins
}

// Routes middleware
app.use('/api', blogRoutes);


// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});