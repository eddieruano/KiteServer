/**
 * [MessPackage holds together a message payload]
 * @param {[type]} obj [object to enqueue]
 */
var count = require('word-count')
/**
 * [Constructor]
 * @param {[type]} obj [object to enqueue]
 */
function MessagePackage(status, rec, text, id, t_in, t_out, delay, verFlag) {
	this.messageStatus = (status == null) ? null : status;
	this.messageRecipient = (rec == null) ? null : rec;
	this.messageText = (text == null) ? null : text;
	this.messageQueueID = (id == null) ? null : id;
	this.messageTimeIn = (t_in == null) ? null : t_in;
	this.messageTimeOut = t_out;
	this.messageDelay  = (delay == null) ? null : delay;
	this.messageVerbose = verFlag;
	this.messageWordCount = (text == null) ? null : count(text);

	this.messagePrint = function(obj) {
		console.log("Status: " +  obj.Status);
		console.log("Recipient: " +  obj.messageRecipient);
		console.log("Text: " +  obj.messageText);
		console.log("QueueID: " +  obj.messageQueueID);
		console.log("Time In: " +  obj.messageTimeIn);
		console.log("Time Out: " +  obj.messageTimeOut);
		console.log("Delay: " +  obj.messageDelay);
		console.log("Verbose: " +  obj.messageVerbose);
		console.log("Word Count: " +  obj.messageWordCount);
	}
}

// // adds an object to the queue
// MessagePackage.prototype.messagePrint = function(mess) {
// 	console.log("Status: " + mess.Status);
// 	console.log("Recipient: " + mess.messageRecipient);
// 	console.log("Text: " + mess.messageText);
// 	console.log("QueueID: " + mess.messageQueueID);
// 	console.log("Time In: " + mess.messageTimeIn);
// 	console.log("Time Out: " + mess.messageTimeOut);
// 	console.log("Delay: " + mess.messageDelay);
// 	console.log("Verbose: " + mess.messageVerbose);
// 	console.log("Word Count: " + mess.messageWordCount);
// };
// export the class
exports.messagePrint = MessagePackage.messagePrint;
exports.MessagePackage = MessagePackage;
