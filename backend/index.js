const express = require('express')
const app = express()
const mongoose=require('mongoose')
const dbConfig = require('./config/db.config.js');

require('dotenv').config();
const api = process.env.API_URL;
const cors = require('cors'); // Allows cross-origin requests
// Configure Express to parse JSON and URL-encoded data
app.use(express.json()); // Automatically parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different domains
app.use(cors());
// Disable the "X-Powered-By" header to prevent disclosing server technology
app.disable('x-powered-by');
const loginRoute=require('./routes/login.route.js')
const registerRoute=require('./routes/register.route.js')

app.get('/chat', (req, res) => {
    res.send('Hello World!')
})

app.use(`${api}/login`,loginRoute);
app.use(`${api}/register`,registerRoute);

// Catch-all route for unhandled requests, responds with a simple message
// app.use((_req, res) => {
// 	return res.status(200).send('Back-end for');
// });

// Get the port number from environment variables or default to 5000
const port = process.env.PORT || 5000;


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
