// Get dependencies
const express = require('express');
const cors = require('cors')
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// Parsers for POST data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use('/', index);
app.get('/viewEmployees', api.viewEmployees);
app.post('/addEmployee', api.addEmployee);
app.get('/deleteEmployee/:id', api.deleteEmployee);
app.get('/getEmployee/:id', api.getEmployee);
app.post('/updateEmployee/:id', api.updateEmployee);

// Catch all other routes and return the index file
/**
 * Get port from environment and store in Express.
 */

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));