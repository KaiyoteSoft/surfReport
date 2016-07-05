jQuery.ajax({
	url: 'http://api.spitcast.com/api/county/spots/santa-cruz/',
	type: 'GET',
	success: function(resultData) { 
		surfData = resultData;
		// console.log(surfData[0]);

		var spotNames = "";

		for (i = 0; i < surfData.length; i++) {
			spotId = surfData[i].spot_id;
			spotNames = spotNames + "<a href=#container onclick=\"spotReport('" +
              spotId + "');\">" + surfData[i].spot_name + "</a>";
		}

		// document.getElementById('surfButton').innerHTML = spotNames;

		}
});


function spotReport(id) {
	document.getElementById('container').innerHTML = "<p>Loading...</p>";
	var spotId = id;
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/spot/forecast/' + spotId+ '/',
		type: 'GET',
		success: function(data) {
			spotData = data;

			var waveContainer = [];
			
			for (i=4; i < 22; i++) {
				var waveSize = spotData[i].size_ft;
				var editedWaveSize = waveSize.toFixed(2);
				waveContainer.push(editedWaveSize);
				var time = spotData[i].hour;
				var spotName = spotData[0].spot_name;
				var waveShape = spotData[0].shape_full;
			}

			var finalWaveSize = spotData[22].size_ft;
			var editedWaveSize = parseFloat(finalWaveSize.toFixed(2));

		// Conditions to determine color of graph depending on wave shape
			if (waveShape == "Poor") {
				var red = 255;
				var green = 84;
				var blue = 84;
			};
			if (waveShape == "Poor-Fair") {
				var red = 255;
				var green = 150;
				var blue = 38;
			};			
			if (waveShape == "Fair") {
				red = 0;
				green = 135;
				blue = 147;
			};
			if (waveShape == "Fair-Good") {
				red = 87;
				green = 255;
				blue = 84;
			};
			if (waveShape == "Good") {
				var red = 0;
				var green = 218;
				var blue = 15;
			};

			console.log(waveShape)

// Code for the graph of the wave height for specific spots
// The values of the graph should change based on the spot selected
    		var chart = new CanvasJS.Chart("container",
			{
			animationEnabled: true,
			title:{
				text: spotName + " Spot Report"
			},
			axisX: {
				labelAngle: 0,
				labelFontSize: 13	
			},
			axisY: {
				title: "Wave Height (feet)"
			},
			data: [
			{
				type: "area", //change type to bar, line, area, pie, etc
				color: "rgba("+red+","+green+","+blue+", 1)",
				showInLegend: false,        
				dataPoints: [
					{ label: "4AM", y: parseFloat(waveContainer[0])},
					{ label: "6AM", y: parseFloat(waveContainer[2])},
					{ label: "8AM", y: parseFloat(waveContainer[4])},
					{ label: "10AM", y: parseFloat(waveContainer[6])},
					{ label: "12PM", y: parseFloat(waveContainer[8])},
					{ label: "2PM", y: parseFloat(waveContainer[10])},
					{ label: "4PM", y: parseFloat(waveContainer[12])},
					{ label: "6PM", y: parseFloat(waveContainer[14])},
					{ label: "8PM", y: parseFloat(waveContainer[16])},
					{ label: "9PM", y: parseFloat(waveContainer[17])},
					{ label: "10PM", y: editedWaveSize}
				]
				}
			],
			legend: {
				cursor: "pointer",
				itemclick: function (e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
				}
				chart.render();
				}
			}
		});
			chart.render();	
		}
	})
}

function tideGraph() {
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/county/tide/santa-cruz/',
		Type: 'GET',
		success: function(tideResult) {
			var tideData = tideResult; 
			// console.log(tideData[0]);

			var tideContainer = [];

			for (i=4; i < 22; i++) {
				var tide = tideData[i].tide;
				var tideHeight = tide.toFixed(2);
				tideContainer.push(tideHeight);
				var time = tideData[i].hour;
			}
			
			var finalDataPoint = tideData[22].tide;
			var restrictedPoint = parseFloat(finalDataPoint.toFixed(2));
			// console.log(restrictedPoint);

// Code for the interactive chart
			var chart = new CanvasJS.Chart("chartContainer",
			{
			animationEnabled: true,
			title:{
				text: "Santa Cruz Tide Graph"
			},
			axisX: {
				labelAngle: 0,
				labelFontSize: 13	
			},
			axisY: {
				title: "Tide (feet)"
			},
			data: [
			{
				type: "spline", //change type to bar, line, area, pie, etc
				showInLegend: false,        
				dataPoints: [
					{ label: "4AM", y: parseFloat(tideContainer[0])},
					{ label: "5AM", y: parseFloat(tideContainer[1])},
					{ label: "6AM", y: parseFloat(tideContainer[2])},
					{ label: "7AM", y: parseFloat(tideContainer[3])},
					{ label: "8AM", y: parseFloat(tideContainer[4])},
					{ label: "9AM", y: parseFloat(tideContainer[5])},
					{ label: "10AM", y: parseFloat(tideContainer[6])},
					{ label: "11AM", y: parseFloat(tideContainer[7])},
					{ label: "12PM", y: parseFloat(tideContainer[8])},
					{ label: "1PM", y: parseFloat(tideContainer[9])},
					{ label: "2PM", y: parseFloat(tideContainer[10])},
					{ label: "3PM", y: parseFloat(tideContainer[11])},
					{ label: "4PM", y: parseFloat(tideContainer[12])},
					{ label: "5PM", y: parseFloat(tideContainer[13])},
					{ label: "6PM", y: parseFloat(tideContainer[14])},
					{ label: "7PM", y: parseFloat(tideContainer[15])},
					{ label: "8PM", y: parseFloat(tideContainer[16])},
					{ label: "9PM", y: parseFloat(tideContainer[17])},
					{ label: "10PM", y: restrictedPoint}
				]
				}
			],
			legend: {
				cursor: "pointer",
				itemclick: function (e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
				}
				chart.render();
				}
			}
		});

		chart.render();
			}
		})
}

function windForecast() {
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/county/wind/santa-cruz/',
		Type: 'GET',
		success: function(windResult) {
			var windData = windResult; 
			// console.log(tideData[0]);

			windContainer = [];

			for (i=4; i < 22; i++) {
				var wind = windData[i].speed_mph;
				var windMagnitude = wind.toFixed(2);
				windContainer.push(windMagnitude);
			}
			
			var finalDataPoint = windData[22].speed_mph;
			var restrictedPoint = parseFloat(finalDataPoint.toFixed(2));
			// console.log(windContainer[0]);

// Code for the interactive chart
			var chart = new CanvasJS.Chart("chartContainer2",
			{
			animationEnabled: false,
			title:{
				text: "Wind Graph"
			},
			axisX: {
				labelAngle: 0,
				labelFontSize: 13	
			},
			axisY: {
				title: "Wind (mph)"
			},
			data: [
			{
				type: "column", //change type to bar, line, area, pie, etc
				color: "rgba(255, 187, 26, 1)",
				showInLegend: false,        
				dataPoints: [
					{ label: "4AM", y: parseFloat(windContainer[0])},
					{ label: "5AM", y: parseFloat(windContainer[1])},
					{ label: "6AM", y: parseFloat(windContainer[2])},
					{ label: "7AM", y: parseFloat(windContainer[3])},
					{ label: "8AM", y: parseFloat(windContainer[4])},
					{ label: "9AM", y: parseFloat(windContainer[5])},
					{ label: "10AM", y: parseFloat(windContainer[6])},
					{ label: "11AM", y: parseFloat(windContainer[7])},
					{ label: "12PM", y: parseFloat(windContainer[8])},
					{ label: "1PM", y: parseFloat(windContainer[9])},
					{ label: "2PM", y: parseFloat(windContainer[10])},
					{ label: "3PM", y: parseFloat(windContainer[11])},
					{ label: "4PM", y: parseFloat(windContainer[12])},
					{ label: "5PM", y: parseFloat(windContainer[13])},
					{ label: "6PM", y: parseFloat(windContainer[14])},
					{ label: "7PM", y: parseFloat(windContainer[15])},
					{ label: "8PM", y: parseFloat(windContainer[16])},
					{ label: "9PM", y: parseFloat(windContainer[17])},
					{ label: "10PM", y: restrictedPoint}
				]
				}
			],
			legend: {
				cursor: "pointer",
				itemclick: function (e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
				}
				chart.render();
				}
			}
		});

		chart.render();
			}
		})
}


