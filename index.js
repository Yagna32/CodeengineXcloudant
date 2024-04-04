var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-66oi1c5e1j9ob2vhhktdpa0n9rv2pj4s52847rwdfpq:9390643e5597d68e5554e1c9879bf4cb@9b4a3cd6-bcad-4cfe-88bd-fc1931de46d7-bluemix.cloudantnosqldb.appdomain.cloud"
var username = "apikey-v2-66oi1c5e1j9ob2vhhktdpa0n9rv2pj4s52847rwdfpq";
var password = "9390643e5597d68e5554e1c9879bf4cb";
var app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, database } = req.body;
  
  const data = {
      name: name,
      email: email
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.post('/update', function (req, res) {
  const database_name=req.body.db;
  console.log(database_name)
  const id=req.body.id;
  console.log(id)
  const rev=req.body.rev;
  const name = req.body.name;
  const pincode =req.body.pincode;
  const phone= req.body.phone;
  const email=req.body.email;

  Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
  console.log(pong); // {"couchdb":"Welcome","version": ..
  
  cloudant.use(database_name).insert({ _id:id , _rev: rev, "name": name , "pincode": pincode, "phone": phone,"email":email }, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data); // { ok: true, id: 'rabbit', ...
        }
      });
  });
  });

  app.post('/delete', function (req, res) {
    console.log(req.body)
    var id,rev;
    const database_name=req.body.database;
    id=req.body.id;
    rev=req.body.rev;
    console.log(database_name,id,rev)
    Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
      if (err) {
        return console.log('Failed to initialize Cloudant: ' + err.message);
      }
    console.log(pong); // {"couchdb":"Welcome","version": ..
    
    cloudant.use(database_name).destroy(id, rev, function(err) {
      if (err) {
        throw err;
      }
    
      res.send('document deleted');
    });
    });
    });



app.listen(PORT,()=>{
  console.log("server is running on port : ",PORT)
});
//console.log(message.getPortMessage() + PORT);



