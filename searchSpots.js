
function searchSpots(county) {
	var countyId = county;
	jQuery.ajax ({
		url: 'http://api.spitcast.com/api/county/spots/'+countyId+'/',
		type: 'GET',
		success: function(data) {
			var allSpots = data;
			var listContainer = [];
			for (i=0; i<allSpots.length; i++) {
				countyName = data[i].county;
				spotName = data[i].spot_name;
				spotId = data[i].spot_id;
				// console.log(countyName);
				listContainer.push('<tr><td>' + countyName + '</td><td><a href="#top" onClick=spotReport('+spotId+');>' 
					+ spotName + '</a></td></tr>');
			}
			spotReport(data[0].spot_id);
			var strippedContainer = listContainer.join("");
			var listTable = '<table id="listTable" class="table table-striped">'+
			'<tr><th style="text-align: center;">County Name</th> <th style="text-align: center;">'+
			'Spot Name</th> </tr>' + strippedContainer + '</table>';
			document.getElementById("listSpots").innerHTML = listTable;
		}
	})
}

function testStrip() {
	console.log("hello world");
	var spotsContainer = document.getElementById("container");
	spotsContainer.display = "block";
	spotsContainer.visibility = "visible";
}