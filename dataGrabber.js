
var request = require('request');
var hookSurfData;
request('http://api.spitcast.com/api/spot/forecast/147/', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var theData = JSON.parse(body);
		console.log(theData.length);

		var surfResponse = "";

		for (i = 0; i < theData.length; i++) {
			surfResponse = surfResponse + theData[i].hour + " " + theData[i].shape_full;
			console.log(theData[i].hour + " " + theData[i].shape_full);
		}
		// console.log(surfResponse);

		hookSurfData = theData[0].date;
		document.getElementById("dataText").innerHTML = surfResponse;


	}
});

