var editedDate; 
var spotId; 

function padNumber(number) {
    var string  = '' + number;
    string      = string.length < 2 ? '0' + string : string;
    return string;
};

function generalForecast(date) {
	var forecastDate = date;
	jQuery.ajax ({
		url: 'http://api.spitcast.com/api/spot/forecast/2/?dcat=day&dval='+forecastDate,
		type: 'GET',
		success: function(steamerLane) {
			var waveData = steamerLane;

			var maxWaveSize = waveData[0].size;
			// console.log(maxWaveSize);

		jQuery.ajax ({
			url: 'http://api.spitcast.com/api/spot/forecast/147/?dcat=day&dval='+forecastDate,
			type: 'GET',
			success: function(hook) {
				var waveData2 = hook;

				var minWaveSize = waveData2[0].size;
				// console.log(minWaveSize);
				document.getElementById('waveSize').innerHTML = minWaveSize + " - " + maxWaveSize + " feet";
				}
			})
			
		}
	})

	jQuery.ajax ({
	url: 'http://api.spitcast.com/api/spot/forecast/147/?dcat=day&dval='+forecastDate,
	type: 'GET',
	success: function(hook) {
		var waveData3 = hook;

		var waveShape = waveData3[0].shape_full;
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

function tideGraph(date) {
	var forecastDate = date;
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/county/tide/santa-cruz/?dcat=day&dval='+forecastDate,
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
			interactivityEnabled: false,
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

function weatherConditions(days) {
	jQuery.ajax ({
		url: 'http://api.wunderground.com/api/b3d5e35f819da87c/forecast/q/CA/Santa_cruz.json',
		type: 'GET',
		success: function(weatherResult) {
			var weatherData = weatherResult;
			if (days==null) {
				days=0;
			}

			var high = weatherData.forecast.simpleforecast.forecastday[days].high.fahrenheit;
			var low = weatherData.forecast.simpleforecast.forecastday[days].low.fahrenheit;
			var date = weatherData.forecast.simpleforecast.forecastday[days].date.pretty;
			editedDate = date.substring(15);
			console.log(editedDate);
			// console.log(high, low, date)

			document.getElementById('date').innerHTML = editedDate;
			document.getElementById('maxTemp').innerHTML = high + "&deg;F";
			document.getElementById('minTemp').innerHTML = low + "&deg;F";		
			document.getElementById('titleForecast').innerHTML = "General Forecast (" + editedDate + ")";
			return editedDate;
		}
	})
}

function sunrise(days) {
	if (days==null) {
		days=0;
	}
    // get today's sunlight times for London
    var times = SunCalc.getTimes(new Date(date.setDate(date.getDate() + days)), 36.959983, -121.965324);

    // format sunrise time from the Date object
    var dawnStr = times.dawn.getHours() + ':' + times.dawn.getMinutes();
    var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
    var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();

    // var adjustedTime = sunsetStr - 12; 	

	document.getElementById('dawn').innerHTML = dawnStr + " AM";
	document.getElementById('sunrise').innerHTML = sunriseStr + " AM";
	document.getElementById('sunset').innerHTML = sunsetStr;
    // console.log(dawnStr, sunriseStr, sunsetStr);
};

function forecast(days) {
	date      = new Date();
	next_date = new Date(date.setDate(date.getDate() + days));
	console.log(next_date)
	formatted = next_date.getUTCFullYear() + padNumber(next_date.getUTCMonth() + 1) + padNumber(next_date.getUTCDate());
	generalForecast(formatted);
	spotReport(spotId, formatted);
	tideGraph(formatted);
	sunrise(days);
	weatherConditions(days);
	console.log(spotId);
	// return formatted;
};
