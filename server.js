let express = require('express');
let app = express();

let http = require('http').createServer(app);

let port = process.env.PORT || 8080;


app.get('/api/test', (req, res) => {
  res.send('Hello World');
});

app.use(express.static(__dirname + '/public'));

http.listen(port, ()=> {
    console.log("Listening on Port ", port);
})