var express = require('express');

var app = express();

app.listen(3000);

//setting template
app.set('view engine','ejs');

//static file
app.use(express.static('./public'));

console.log('listening to port 3000');

