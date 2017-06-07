/**
 * [MessageQueue holds together the active message packages waiting to be sent]
 * 
 * @param {[type]} obj [object to enqueue]
 */
/**
 * [Constructor]
 * @param {[type]} obj [object to enqueue]
 */

function MessageQueue(obj) {
	this.messageQueueSize = 0;
	this.messageQueueArray = [];

	// this.queuePrint = function(obj) {
	// 	console.log("Size: " + obj.messageQueueSize);
	// 	console.log("Contents: " + obj.messageQueueArray);
	// };

}
// // prints MessageQueue information
MessageQueue.prototype.queuePrint = function(queue) {
	console.log("Size: " + queue.messageQueueSize);
	console.log("Contents: " + queue.messageQueueArray);
};

MessageQueue.prototype.queueAdd = function(queue, obj) {
	console.log("Size: " + queue.messageQueueSize);
	console.log("Contents: " + queue.messageQueueArray);
	queue.messageQueueArray.push(obj)
	queue.messageQueueSize += 1;
};
// export the class
module.exports = MessageQueue;