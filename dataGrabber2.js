/*jslint sub: true, maxerr: 50, indent: 4, browser: true */
var editedDate; 
var spotId; 
var spot;
var title;
var spotOne;
var spotTwo;

function showMenu() {
	$("#navMenu a:first").tab("show");
};

function padNumber(number) {
    var string  = '' + number;
    string      = string.length < 2 ? '0' + string : string;
    return string;
};

function generalForecast(date, first, second) {
	spotOne = first;
	spotTwo = second;
	var forecastDate = date;
	jQuery.ajax ({
		url: 'http://api.spitcast.com/api/spot/forecast/'+spotOne+'/?dcat=day&dval='+forecastDate,
		type: 'GET',
		success: function(dataOne) {
			var waveData = dataOne;

			var maxWaveSize = waveData[10].size;
			// console.log(maxWaveSize);

		jQuery.ajax ({
			url: 'http://api.spitcast.com/api/spot/forecast/'+spotTwo+'/?dcat=day&dval='+forecastDate,
			type: 'GET',
			success: function(dataTwo) {
				var waveData2 = dataTwo;

				var minWaveSize = waveData2[10].size;
				// console.log(minWaveSize);
				document.getElementById('waveSize').innerHTML = minWaveSize + " - " + maxWaveSize + " feet";
				}
			})
			
		}
	})

	jQuery.ajax ({
	url: 'http://api.spitcast.com/api/spot/forecast/'+spotOne+'/?dcat=day&dval='+forecastDate,
	type: 'GET',
	success: function(dataOne) {
		var waveData3 = dataOne;

		var waveShape = waveData3[10].shape_detail.swell;
		document.getElementById('waveShape').innerHTML = "Wave Shape: " + waveShape;
		// document.getElementById('elem').innerHTML = formatted;
		}
	})
}


var spotReport = function(id, date) {
	document.getElementById('container').innerHTML = "<p>Loading...</p>";
	spotId = id;
	var forecastDate = date;
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/spot/forecast/' + spotId+ '/?dcat=day&dval='+forecastDate,
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
				var waveShape = spotData[5].shape_detail.swell;
			}

			var finalWaveSize = spotData[22].size_ft;
			var editedWaveSize = parseFloat(finalWaveSize.toFixed(2));
			console.log(waveShape);

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
				green = 200;
				blue = 140;
			};
			if (waveShape == "Good") {
				var red = 0;
				var green = 225;
				var blue = 80;
			};

// Code for the graph of the wave height for specific spots
// The values of the graph should change based on the spot selected
    		var chart = new CanvasJS.Chart("container",
			{
			animationEnabled: true,
			interactivityEnabled: false,
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
			return spotId;
		}
	})
}

function tideGraph(date, area, name) {
	spot = area;
	title = name;
	var forecastDate = date;
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/county/tide/'+spot+'/?dcat=day&dval='+forecastDate,
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
			interactivityEnabled: false,
			title:{
				text: title + " Tide Graph"
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
						e.dataSeries.visible = false;
				}
				chart.render();
				}
			}
		});

		chart.render();
			}
		})
}

function forecastURL() {
		window.open('forecast.html?'+title+','+spotOne+','+spotTwo, "_self");
}

