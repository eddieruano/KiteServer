var express = require('express');
var app = express();

var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var scheduler = require('node-schedule');
var imess = require("iMessageModule");

// Flag Variables
var delayFlag = false;
// Queue Variables
var jobs;
var msgQueueIDs = [];
var numberOfQueuedMsgs = 0;
// use body parser so we can get info from POST and/or URL parameters
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Message Variables
var message;
var recipient;

var port = process.env.PORT || 9000;    // create, sign, and verify tokens
//mongoose.connect(config.database);      // connect to database
//app.set('superSecret', config.secret);  // secret variable

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
  var queueID = parseInt(req.body.queueID);

  //set start
  var start = new Date(Date.now());
  var sendTime = new Date(start.getTime() + (delay * 1000)); 
  if (delay != 0)
  {
    // Trip the delay Flag
    delayFlag = true;
    // Save the scheduleID
    msgQueueIDs.push(queueID);
    numberOfQueuedMsgs += 1;
    job = scheduler.scheduleJob(sendTime, function(err){
      if (err) {
        throw err;
      }
      var delayed = "\n\n*This message was delayed by " +delay.toString()+" seconds*";
      message = message + delayed;
      deliver(recipient,message);
      
      });
  }
  else
  {
    delayFlag = false;
    deliver(recipient,message);
  }
  res.json({status: "Success", message: message, delayed: delay, queueID: queueID.toString(), queueIDNum: queueID});
  console.log("Message Sending Now");
  console.log("Recipient: "+ recipient);
  console.log("Message Contents: "+ message);
  console.log("Delay: "+ delay);
  console.log("QueueID: "+ queueID);
  console.log("SendTime: "+ sendTime);
  console.log(msgQueueIDs)
});

app.post('/api/undo', function(req,res){
  // Save the command and the send id
  var command = req.body.command
  var queueID = req.body.queueID;
  var my_job = queueID.toString()
  if (command == "cancel")
  {
    msgJob = schedule.scheduledJobs[queueID];
    msgJob.cancel()
    console.log("Message canceled");
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
   res.json({status: "Success Cancel", queueID: queueID, messageText: "Lol"});
});

function deliver(recipient, message){
   imess.sendMessage(recipient, message);
}

app.listen(port);
console.log('Started Service');