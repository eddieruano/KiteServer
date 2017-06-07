/**
 * [MessageQueue holds together the active message packages waiting to be sent]
 * 
 * @param {[type]} obj [object to enqueue]
 */
/**
 * [Constructor]
 * @param {[type]} obj [object to enqueue]
 */

var MessPackage = require('./MessagePackage.js').MessagePackage;

function MessageQueue() {
	this.messageQueueSize = 0;
	this.messageQueueArray = [];
}

// prints MessageQueue information
MessageQueue.prototype.queuePrint = function(queue) {
	console.log("Size: " + queue.messageQueueSize);
	console.log("Contents: " + queue.messageQueueArray);
};

MessageQueue.prototype.queueAdd = function(queue, mess) {
	console.log("Size: " + queue.messageQueueSize);
	console.log("Contents: " + queue.messageQueueArray);
	queue.messageQueueArray.push(mess);
	queue.messageQueueSize += 1;
};
// export the class
exports.MessageQueue = MessageQueue;