/*
* @Author: Eddie Ruano
* @Date:   2017-06-07 06:18:14
* @Last Modified by:   Eddie Ruano
* @Last Modified time: 2017-06-07 06:35:07
*/

'use strict';


var express = require('express');
var send = express();
var iMessageMod = require("iMessageModule");

var id = "Eddie Ruano"
var mes = "This is message"

iMessageMod.sendMessage(id, mes, function(){
	console.log("Sent");
});

send.listen(8080);
console.log('Started Service');