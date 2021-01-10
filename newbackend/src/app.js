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


app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('got upload request');
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    console.log(file);
    
    const array = await parser(file.path, 'bold');

    console.log(array);

    res.send(array);
});

app.get('/test', (req, res) => {
    res.send('hello');
});