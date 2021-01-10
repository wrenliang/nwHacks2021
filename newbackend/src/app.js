// Express Framework
const express = require('express');

const cors = require('cors');
const multer = require('multer');

// Objects
const PORT = process.env.PORT_NUM || 8000;

const app = express();
app.use(express.json());
app.use(cors());

server = app.listen(PORT, () => {
    console.log(`[Server] Listening on PORT ${PORT}`);
});


// --- testing
var storage = multer.diskStorage({
    destination: './files',
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  });
  
var upload = multer({ storage: storage }).single('test');

var usersRouter = require('./routes/users');
var setsRouter = require('./routes/sets');

app.use('/users', usersRouter);
app.use('/sets', setsRouter);

app.post('/upload', (req, res) => {
    console.log('got upload request');
    upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
    });
});

app.get('/test', (req, res) => {
    res.send('hello');
});