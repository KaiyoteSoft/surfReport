function barbaraData() {
	spotReport(198);
	tideGraph(null, "santa-barbara", "Santa Barbara");
	spot="santa-barbara";
	title="Santa Barbara";
	document.getElementById("titlePage").innerHTML = title + " Surf Report and Tide Graph"
	spotOne=179;
	spotTwo=198;
	generalForecast(null, spotOne, spotTwo);
	windForecast();
	var cruz = document.getElementById("cruzButton");
	cruz.style.visibility = "hidden";
	cruz.style.display = "none";
	var barbara = document.getElementById("barbaraButton");
	barbara.style.visibility = "visible";
	barbara.style.display = "block";
}

function cruzData() {
	spotReport(147);
	spot="santa-cruz";
	title="Santa Cruz";
	tideGraph(null, spot, title);
	document.getElementById("titlePage").innerHTML = title + " Surf Report and Tide Graph";
	spotOne=2;
	spotTwo=147;
	generalForecast(null, spotOne, spotTwo);
	windForecast();
	var cruz = document.getElementById("cruzButton");
	cruz.style.visibility = "visible";
	cruz.style.display = "block";
	var barbara = document.getElementById("barbaraButton");
	barbara.style.visibility = "hidden";
	barbara.style.display = "none";
}