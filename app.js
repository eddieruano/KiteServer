var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var scheduler = require('node-schedule');
var imess = require("iMessageModule");

var message;
var recipient;
// Queue Array to be filled with scheduler job identifiers
var msgQueueIDs = [];
var numberOfQueuedMsgs = 0;
app.use(bodyParser.json());
// Conversations = require('./models/conversations');
// Connect
// mongoose.connect('mongodb://localhost/kiteVault');
// var db = mongoose.connection;

app.get('/', function(req, res){
   res.send('Wrong command. Use /api/');
});

// app.get('/api/conversations', function(req, res){
//    Conversations.getConversations(function(err, conversations){
//       if(err){
//          throw err;
//       }
//       //res.json({recipient: 'John', type: "Titties"});
//       res.json(conversations);
//    });
// });

app.post('/api/send', function(req,res){
  recipient = req.body.recipient;
  message = req.body.message;
   
  var delay = parseInt(req.body.delay);
  var queueID = parseInt(req.body.queueID)

  //set start
  var start = new Date(Date.now());
    var sendTime = new Date(start.getTime() + (delay * 1000)); 
    if (delay != 0)
    {
      // Save the scheduleID
      msgQueueIDs.push(queueID)
      numberOfQueuedMsgs += 1
      scheduler.scheduleJob(queueID, sendTime, function(err){
        if (err) {
          throw err;
        }
        if (delay > 0) {
          var delayed = "\n\n*This message was delayed by " +delay.toString()+" seconds*";
          message = message + delayed;
        }
          deliver(recipient,message);
          res.json({status: "Success", delayed: delay});
        });
    }
    else
    {
      deliver(recipient,message);
      res.json({status: "Success", delayed: delay});
    }
});


app.post('/api/undo', function(req,res){
  // Save the command and the send id
  var command = req.body.command
  var queueID = req.body.queueID;
  var my_job;
  if (command == "cancel")
  {
    msgJob = schedule.scheduledJobs[queueID];
    msgJob.cancel()
    console.log("Message canceled")
  }
  else if (command == "changeDelay")
  {

  }
  else if (command == "sendNow")
  {

  }
  // reformulate the queue
  for(var i = msgQueueIDs.length - 1; i >= 0; i--) {
    if(array[i] === queueID) {
       array.splice(i, 1);
    }
  }
  numberOfQueuedMsgs--;
  if (err)
  {
    throw err;
  }
   scheduler.cancel();
   res.json({status: "Success Cancel", queueID: queueID, messageText: });
});

function deliver(recipient, message){
   imess.sendMessage(recipient, message);
}

app.listen(9000);
console.log('Started Service');