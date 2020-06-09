const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json({limit: '10gb'}));
app.use(bodyParser.urlencoded({limit: '10gb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./mongo');

let port = 3000;

app.listen(process.env.PORT || 8001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports = app;
