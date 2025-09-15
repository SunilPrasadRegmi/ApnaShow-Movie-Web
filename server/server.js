import "dotenv/config.js"
import http from 'http';
import app from './src/app.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server running on port ${port}....`);
    //  console.log({
    //     port: port,
    //     environment: process.env.NODE_ENV || 'development',
    //     healthCheck: `http://localhost:${port}/health`,
    //     apiBase: `http://localhost:${port}/api/v1`
    // });
});
