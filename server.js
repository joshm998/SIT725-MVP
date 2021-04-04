let express = require('express');
let app = express();

let http = require('http').createServer(app);

let port = process.env.PORT || 8080;

// App

app.get('/test', (req, res) => {
  res.send('Hello World');
});

http.listen(port, ()=> {
    console.log("Listening on Port ", port);
})