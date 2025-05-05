const express = require('express');
const cors = require('cors'); 
const apiRoutes = require('./Routes/routes.js');
const app = express();
// Active CORS 
app.use(cors()); 
app.use(express.json()); 
app.use('/api', apiRoutes); 
app.listen(3000, () =>{ console.log('Server running on http://localhost:3000');});   
