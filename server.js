const express = require('express');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const port = process.env.PORT || 8080;

app.get('/api/test', (req, res) => {
  res.send('Hello World');
});

app.use(express.static(path.join(__dirname, '/public')));

http.listen(port, () => {
  console.log('Listening on Port ', port);
});
