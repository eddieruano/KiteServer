/**
 * [Queue, a simple queue structure i wrote to queue messages in.]
 * @param {[type]} obj [object to enqueue]
 */
  //## Initialize Top Modules ##//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var scheduler = require('node-schedule');
var iMessageMod = require("iMessageModule");
  // Begin Custom modules
var MessagePackage = require('./MessagePackage');
var MessageQueue = require('./MessageQueue');

  //!!################### Initialize Middleware Express ###################!!//
var port = process.env.PORT || 9000;    // create, sign, and verify tokens
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
  //!!################### Initialize Database Mongooose ###################!!//
//var mongoose = require('mongoose'); 
//mongoose.connect(config.database);      // connect to database
//app.set('superSecret', config.secret);  // secret variable
//Conversations = require('./models/conversations');
  // Connect
//mongoose.connect('mongodb://localhost/kiteVault');
//var db = mongoose.connection;

  //!!################### Initialize Main Scheduler     ###################!!//

  //!!################### Initialize MessagePackage     ###################!!//
//var messPack = new MessagePackage();   // one instance of a message
  //!!################### Initialize Main MessageQueue  ###################!!//

var messPack = new MessagePackage(null, null, null, null, null, null, null, null);
var messQueue = new MessageQueue();

  //!!################### Initialize Root API GET ###################!!//
app.get('/', function(req, res){
   res.send('Wrong command. Use /api/');
});
  //!!################### Initialize Database GETS ###################!!//
// app.get('/api/conversations', function(req, res){
//    Conversations.getConversations(function(err, conversations){
//       if(err){
//          throw err;
//       }
//       //res.json({recipient: 'John', type: "Titties"});
//       res.json(conversations);
//    });
// });

// Get information on the queue //
//app.get('/api/getQueue', function(req, res){

var counter = 0;
//});
  //!!################### Initialize Main API Send  ###################!!//
app.post('/api/send', function(req,res){
  // Save the time at which this message was received
  var startTime = new Date(Date.now());
  console.log(req);
  // Get all relevant data from the post
  var status;
  var recipient = req.body.recipient;
  var message = req.body.payload;
  var delay = parseInt(req.body.delay);
  var verbose = req.body.verbose;
  var queueID;
  var sendTime;
  // Create a queue ID based on recipient and time
  if (delay > 0) 
  {
    status = "Queued";
    // Creates a new QueueID for the message package
    queueID = renderQueueID(recipient, message, delay);
    // Calculate the new time to send
    sendTime = new Date(startTime.getTime() + (delay * 1000)); 
    // Create instance and add to Queue
    if (verbose == "True")
    {
      message = message + "\n\n*This message was delayed by " +delay.toString()+" seconds*";
    }
    messPack = new MessagePackage(status, recipient, message, queueID, startTime, sendTime, delay, verbose);
    messPack.messagePrint(messPack);
    
    // SCHEDULE THE JOB
    messPack.queueID = scheduler.scheduleJob(sendTime, function(){
      console.log("R: " + messPack.messageRecipient);
      console.log("T: " + messPack.messageText);
      console.log("Sent Message: " + this.name);

      deliver(messPack.messageRecipient, messPack.messageText);
    });
    messQueue.queueAdd(messQueue, messPack);
    res.json(
        {status: "Success", recipient: recipient, message: message, delayed: delay, sendTime:  sendTime, queueID: queueID}
        );
  }
  else 
  {
    // Set status
    status = "Direct";
    // Set to ignore on the queueID
    queueID = -1;
    // Sending the message now essentially
    sendTime = startTime;
    // Create the instance but don't add it to the queue
    messPack = new MessagePackage(status, recipient, message, queueID, startTime, sendTime, delay, verbose);
    deliver(recipient, message, function(err){
        if (err) {
          console.log(err);
        }
        
        res.json(
        {status: "Success", recipient: recipient, message: message, delayed: delay, sendTime:  sendTime, queueID: queueID}
        );
      });
    }
  // Begin Send logic
  // if (delay != 0)
  // {
  //   // Trip the delay Flag
  //   delayFlag = true;
  //   // Save the scheduleID
  //   msgQueueIDs.push(queueID);
  //   numberOfQueuedMsgs += 1;
  //   job = scheduler.scheduleJob(sendTime, function(err){
  //     if (err) {
  //       throw err;
  //     }
  //     var delayed = "\n\n*This message was delayed by " +delay.toString()+" seconds*";
  //     message = message + delayed;
  //     //deliver(recipient,message);
      
  //     });
  // }
  // else
  // {
  //   delayFlag = false;
  //   //deliver(recipient,message);
  // }
  //res.json({status: "Success", message: message, delayed: delay, queueID: queueID.toString(), queueIDNum: queueID});
  console.log("DONE ONE");
});

app.post('/api/undo', function(req,res){
  // Save the command and the send id
  var command = req.body.command;
  var queueID = req.body.queueID;
  var my_job = req.body.queueID.toString();
  if (command == "cancel")
  {
    msgJob = schedule.scheduledJobs[queueID];
    msgJob.cancel();
    console.log("Message canceled");
  }
  else if (command == "changeDelay")
  {

  }
  else if (command == "sendNow")
  {

  }
  else
  {
    console.log("Error with command");
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
  res.json({status: "Success", message: message, delayed: delay, jobNum: my_job, queueIDNum: queueID});
  console.log(msgQueueIDs);
});

function deliver(recipient, message){
   iMessageMod.sendMessage(recipient, message);
   console.log("Sentttt");
}

function renderQueueID(message){
   return counter += 1;
}

app.listen(port);
console.log('Started Service');