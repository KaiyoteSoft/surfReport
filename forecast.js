// this is the ugliest code I have ever written :(


var orange = "#FF9626";
var blue = "#24A3AF";
var green = "#57C88C";
var firstValue = 10;
var secondValue = 25; 
var third = 60;
var fourth = 85;
var fifth = 110;
var sixth = 135;
var seventh = 160;

function weekForecast() {
	var rawURL = window.location.href;
	var editedURL = rawURL.substr(rawURL.indexOf("?")+1)
	var parsedURL = editedURL.split(',');
	var spotName = parsedURL[0];
	spotName = spotName.replace('%20',' ')
	var spotOne = parsedURL[1];
	var spotTwo = parsedURL[2];
	console.log(parsedURL);
	// spotOne = first;
	// spotTwo = second;
	document.getElementById('firstDay').innerHTML = "<p>Loading...</p>";
	jQuery.ajax ({
		url: 'http://api.spitcast.com/api/spot/forecast/'+spotOne+'/?dcat=week',
		type: 'GET',
		success: function(location1) {
			var waveData = location1;

			var firstMaxSize = waveData[firstValue].size;
			var firstMaxShape = waveData[firstValue].shape_detail.swell;
			var date1 = waveData[firstValue].gmt;
			var firstEditedDate = date1.substring(5);
			var firstDate = firstEditedDate.slice(0,-2);

			var secondMaxSize = waveData[secondValue].size;
			var secondMaxShape = waveData[secondValue].shape_detail.swell;
			var date2 = waveData[secondValue].gmt;
			var secondEditedDate = date2.substring(5);
			var secondDate = secondEditedDate.slice(0,-2);

			var thirdMaxSize = waveData[third].size;
			var thirdMaxShape = waveData[third].shape_detail.swell;
			var date3 = waveData[third].gmt;
			var thirdEditedDate = date3.substring(5);
			var thirdDate = thirdEditedDate.slice(0,-2);

			var fourthMaxSize = waveData[fourth].size;
			var fourthMaxShape = waveData[fourth].shape_detail.swell;
			var date4 = waveData[fourth].gmt;
			var fourthEditedDate = date4.substring(5);
			var fourthDate = fourthEditedDate.slice(0,-2);

			var fifthMaxSize = waveData[fifth].size;
			var fifthMaxShape = waveData[fifth].shape_detail.swell;
			var date5 = waveData[fifth].gmt;
			var fifthEditedDate = date5.substring(5);
			var fifthDate = fifthEditedDate.slice(0,-2);

			var sixthMaxSize = waveData[sixth].size;
			var sixthMaxShape = waveData[sixth].shape_detail.swell;
			var date6 = waveData[sixth].gmt;
			var sixthEditedDate = date6.substring(5);
			var sixthDate = sixthEditedDate.slice(0,-2);

			var seventhMaxSize = waveData[seventh].size;
			var seventhMaxShape = waveData[seventh].shape_detail.swell;
			var date7 = waveData[seventh].gmt;
			var seventhEditedDate = date7.substring(5);
			var seventhDate = seventhEditedDate.slice(0,-2);

//this generates the data from the second (and usually smaller) location
		jQuery.ajax ({
			url: 'http://api.spitcast.com/api/spot/forecast/'+spotTwo+'/?dcat=week',
			type: 'GET',
			success: function(location2) {
				var waveData2 = location2;

				var firstMinSize = waveData2[firstValue].size;
				var firstDay = waveData2[firstValue].day;
				var firstMinShape = waveData2[firstValue].shape_detail.swell;

				var secondMinSize = waveData2[secondValue].size;
				var secondDay = waveData2[secondValue].day;
				var secondMinShape = waveData2[secondValue].shape_detail.swell;

				var thirdMinSize = waveData2[third].size
				var thirdDay = waveData2[third].day;
				var thirdMinShape = waveData2[third].shape_detail.swell;

				var fourthMinSize = waveData2[fourth].size;
				var fourthDay = waveData2[fourth].day;
				var fourthMinShape = waveData2[fourth].shape_detail.swell;

				var fifthMinSize = waveData2[fifth].size;
				var fifthDay = waveData2[fifth].day;
				var fifthMinShape = waveData2[fifth].shape_detail.swell;

				var sixthMinSize = waveData2[sixth].size;
				var sixthDay = waveData2[sixth].day;
				var sixthMinShape = waveData2[sixth].shape_detail.swell;

				var seventhMinSize = waveData2[seventh].size
				var seventhDay = waveData2[seventh].day;
				var seventhMinShape = waveData2[seventh].shape_detail.swell;

//this creates the header separately and then pushes the info to the divs on the html file 
				var firstHeader = '<tr><th id="header1" style="text-align: center;">'+firstDay+': '+firstDate+'</th></tr>'				
				document.getElementById("firstDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				firstHeader+
				'<tr><td>'+firstMinSize+' - '+firstMaxSize+'ft</td></tr>'+
				'<tr><td>'+firstMaxShape+'</td></tr></table>'; 

				var secondHeader = '<tr><th id="header2" style="text-align: center;">'+secondDay+': '+secondDate+'</th></tr>'		
				document.getElementById("secondDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				secondHeader+
				'<tr><td>'+secondMinSize+' - '+secondMaxSize+'ft</td></tr>'+
				'<tr><td>'+secondMaxShape+'</td></tr></table>'; 

				var thirdHeader = '<tr><th id="header3" style="text-align: center;">'+thirdDay+': '+thirdDate+'</th></tr>'		
				document.getElementById("thirdDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				thirdHeader+
				'<tr><td>'+thirdMinSize+' - '+thirdMaxSize+'ft</td></tr>'+
				'<tr><td>'+thirdMaxShape+'</td></tr></table>'; 

				var fourthHeader = '<tr><th id="header4" style="text-align: center;">'+fourthDay+': '+fourthDate+'</th></tr>'		
				document.getElementById("fourthDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				fourthHeader+
				'<tr><td>'+fourthMinSize+' - '+fourthMaxSize+'ft</td></tr>'+
				'<tr><td>'+fourthMaxShape+'</td></tr></table>'; 

				var fifthHeader = '<tr><th id="header5" style="text-align: center;">'+fifthDay+': '+fifthDate+'</th></tr>'		
				document.getElementById("fifthDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				fifthHeader+
				'<tr><td>'+fifthMinSize+' - '+fifthMaxSize+'ft</td></tr>'+
				'<tr><td>'+fifthMaxShape+'</td></tr></table>'; 

				var sixthHeader = '<tr><th id="header6" style="text-align: center;">'+sixthDay+': '+sixthDate+'</th></tr>'		
				document.getElementById("sixthDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				sixthHeader+
				'<tr><td>'+sixthMinSize+' - '+sixthMaxSize+'ft</td></tr>'+
				'<tr><td>'+sixthMaxShape+'</td></tr></table>'; 

				var seventhHeader = '<tr><th id="header7" style="text-align: center;">'+seventhDay+': '+seventhDate+'</th></tr>'		
				document.getElementById("seventhDay").innerHTML = '<table style="text-align:center;" class="table table-striped">'+
				seventhHeader+
				'<tr><td>'+seventhMinSize+' - '+seventhMaxSize+'ft</td></tr>'+
				'<tr><td>'+seventhMaxShape+'</td></tr></table>'; 

//Display the name of the location 
				document.getElementById("titlePage").innerHTML = spotName+': Seven Day Forecast';

//Determines the color of the table based on wave shape
				if (firstMaxShape==="Poor"||firstMaxShape==="Poor-Fair"){
					document.getElementById("header1").style.background = orange;
				}
				if (firstMaxShape==="Fair"){
					document.getElementById("header1").style.background = blue;
				};
				if (firstMaxShape==="Good"||firstMaxShape==="Fair-Good") {
					document.getElementById("header1").style.background = green;
				}

				if (secondMaxShape==="Poor"||secondMaxShape==="Poor-Fair"){
					document.getElementById("header2").style.background = orange;
				}
				if (secondMaxShape==="Fair"){
					document.getElementById("header2").style.background = blue;
				};
				if (secondMaxShape==="Good"||secondMaxShape==="Fair-Good") {
					document.getElementById("header2").style.background = green;
				}

				if (thirdMaxShape==="Poor"||thirdMaxShape==="Poor-Fair"){
					document.getElementById("header3").style.background = orange;
				}
				if (thirdMaxShape==="Fair"){
					document.getElementById("header3").style.background = blue;
				};
				if (thirdMaxShape==="Good"||thirdMaxShape==="Fair-Good") {
					document.getElementById("header3").style.background = green;
				}

				if (fourthMaxShape==="Poor"||fourthMaxShape==="Poor-Fair"){
					document.getElementById("header4").style.background = orange;
				}
				if (fourthMaxShape==="Fair"){
					document.getElementById("header4").style.background = blue;
				};
				if (fourthMaxShape==="Good"||fourthMaxShape==="Fair-Good") {
					document.getElementById("header4").style.background = green;
				}

				if (fifthMaxShape==="Poor"||fifthMaxShape==="Poor-Fair"){
					document.getElementById("header5").style.background = orange;
				}
				if (fifthMaxShape==="Fair"){
					document.getElementById("header5").style.background = blue;
				};
				if (fifthMaxShape==="Good"||fifthMaxShape==="Fair-Good") {
					document.getElementById("header5").style.background = green;
				};

				if (sixthMaxShape==="Poor"||sixthMaxShape==="Poor-Fair"){
					document.getElementById("header6").style.background = orange;
				}
				if (sixthMaxShape==="Fair"){
					document.getElementById("header6").style.background = blue;
				};
				if (sixthMaxShape==="Good"||sixthMaxShape==="Fair-Good") {
					document.getElementById("header6").style.background = green;
				};

				if (seventhMaxShape==="Poor"||seventhMaxShape==="Poor-Fair"){
					document.getElementById("header7").style.background = orange;
				}
				if (seventhMaxShape==="Fair"){
					document.getElementById("header7").style.background = blue;
				};
				if (seventhMaxShape==="Good"||seventhMaxShape==="Fair-Good") {
					document.getElementById("header7").style.background = green;
				};

				}
			})
			
		}
	})
}