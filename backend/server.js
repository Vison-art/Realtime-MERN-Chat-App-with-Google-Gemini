import dotenv from 'dotenv/config.js';
import http from 'http';
import app from './app.js';
console.log(`PORT from .env: ${process.env.PORT}`);
const port = process.env.PORT || 3000;



const server = http.createServer(app);




server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});