// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Import routes
// const apiRoutes = require('./api/api');

// const app = express();

// // Middleware
// app.use(cors()); // Enable CORS for all routes
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));


// // Use routes
// app.use('/api', apiRoutes);

// app.get('/', (req, res) => {
//   res.send('Server is running!');
// });

// app.get('/test', (req, res) => {
//   res.send('Test route!');
// });


// // Error handling middleware
// app.use((err, req, res, next) => {
//   if (err.status && err.message) {
//     res.status(err.status).send(err.message);
//   } else {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
//   }
// });

// const PORT = process.env.PORT || 4000;


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app; // Export for testing purposes
