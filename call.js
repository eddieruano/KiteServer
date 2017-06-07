var Cayenne = require('cayennejs');

const cayenneClient = new Cayenne.MQTT({
  username: "b1a32a40-4747-11e7-b5e5-0383e230cbfa",
  password: "69ce3f90356b85ae6458cfb19188b405064b2f3b",
  clientId: "89d6a250-479a-11e7-98bd-9ffdab1de3b9"
});

cayenneClient.connect((err, mqttClient) => {
  // dashboard widget automatically detects datatype & unit
  cayenneClient.kelvinWrite(3, 65);
  // sending raw values without datatypes
  cayenneClient.rawWrite(4, 123);
  // subscribe to data channel for actions (actuators)
  cayenneClient.on("cmd9", function(data) {
    console.log(data);
  });

});