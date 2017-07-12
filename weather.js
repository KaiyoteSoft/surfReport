function windForecast() {
	jQuery.ajax({
		url: 'http://api.spitcast.com/api/county/wind/'+spot+'/',
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
	generalForecast(formatted, spotOne, spotTwo);
	spotReport(spotId, formatted);
	tideGraph(formatted, spot, title);
	sunrise(days);
	weatherConditions(days);
	console.log(spot);
	// return formatted;
};
