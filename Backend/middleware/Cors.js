// middleware/Cors.js
const cors = require('cors');

const corsOptions = {
  origin: '*', // allow all, or customize
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

module.exports = cors(corsOptions); // ✅ export middleware function

