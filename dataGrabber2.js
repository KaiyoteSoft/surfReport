jQuery.ajax({
	url: 'http://api.spitcast.com/api/county/spots/santa-cruz/',
	type: 'GET',
	success: function(resultData) { 
		surfData = resultData;
		// console.log(surfData[0]);

		var spotNames = "";

		for (i = 0; i < surfData.length; i++) {
			spotId = surfData[i].spot_id;
			spotNames = "<a>" + spotNames + "</a>" + "<br>" + "<a onclick=\"spotReport('" +
              spotId + "');\">" + surfData[i].spot_name + "</a>";
		}

		document.getElementById('dataText').innerHTML = spotNames;

		}
});

function spotReport(id) {
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
			}

			var finalWaveSize = spotData[22].size_ft;
			var editedWaveSize = parseFloat(finalWaveSize.toFixed(2));

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
				type: "spline", //change type to bar, line, area, pie, etc
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
			console.log(restrictedPoint);

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


