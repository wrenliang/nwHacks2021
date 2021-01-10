// Express Framework
const express = require('express');

// Objects
const PORT = process.env.PORT_NUM || 3000;

const app = express();
app.use(express.json());

server = app.listen(PORT, () => {
    console.log(`[Server] Listening on PORT ${PORT}`);
});