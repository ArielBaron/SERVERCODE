const http = require('http');
const app = require('./app'); // 👈 make sure this is correct
require('dotenv').config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`🌐 Server running at http://localhost:${port}`);
});

server.on('error', (err) => {
  console.error('SERVER ERROR:', err.message);
});
