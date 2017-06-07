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
	this.messageText = (texy == null) ? null : text;
	this.messageQueueID = (id == null) ? null : id;
	this.messageTimeIn = (t_in == null) ? null : t_in;
	this.messageTimeOut = t_out;
	this.messageDelay  = (delay == null) ? null : delay;
	this.messageVerbose = verFlag;
	this.messageWordCount  = (text == null) ? null : count(text);

	// adds an object to the queue
	MessagePackage.prototype.messagePrint = function(mess) {
		console.log("Status: " + mess.Status);
		console.log("Recipient: " + mess.messageRecipient);
		console.log("Text: " + mess.messageText;
		console.log("QueueID: " + mess.messageQueueID);
		console.log("Time In: " + mess.messageTimeIn);
		console.log("Time Out: " + mess.messageTimeOut);
		console.log("Delay: " + mess.messageDelay);
		console.log("Verbose: " + mess.messageVerbose);
		console.log("Word Count: " + mess.messageWordCount);
	};
}
// export the class
exports.MessagePackage = MessagePackage;