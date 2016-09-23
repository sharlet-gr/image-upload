var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Upload an image' });
});

router.post('/image', function(req, res) {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (!filename) {
      return res.render('index', { title: 'Please choose a file!' });
    }
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.render('index', { title: 'Please choose a valid image' });
    }
    console.log('Uploading: ',filename);
    fstream = fs.createWriteStream(path.join(__dirname, '/uploads/', filename));
    file.pipe(fstream);
    return fstream.on('close', () => {
      console.log(filename,': Upload successful!');
      return res.render('index', { title: 'Image uploaded successfully!' });
    });
  });
});

module.exports = router;
