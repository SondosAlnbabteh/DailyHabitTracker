const express = require('express');
const http = require('http');
const mongoose = require('./config/config');
const habitRoutes = require('./routes/habitRoutes');
const cors = require('cors'); // استيراد cors

const app = express();

// استخدام cors كـ middleware
app.use(cors())


const server = http.createServer(app);

app.use(express.json());

app.use('/api/habits', habitRoutes); 

server.listen(3000, function(){
    console.log("Server is running at http://localhost:3000")
});