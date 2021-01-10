// Express Framework
const express = require('express');

const cors = require('cors');
const multer = require('multer');

const parser = require('./textParser/textParser');

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
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
  });
  
var upload = multer({ storage: storage });

var usersRouter = require('./routes/users');
var setsRouter = require('./routes/sets');

app.use('/users', usersRouter);
app.use('/sets', setsRouter);

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('got upload request');
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    console.log(req.query);

    const termProperty = req.query.termProperty;
    const dividerChar = req.query.dividerChar;
    
    const array = await parser(file.path, termProperty, dividerChar);

    console.log(array);

    res.send(array);
});

app.get('/test', (req, res) => {
    res.send('hello');
});