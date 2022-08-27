var arCells = [];			//HRMPF Globales Array hält Info über zustände etc. irgendwie wegkriegen
var x,y;
var genCount = 0;
function cCell(alive){ 		//Pseudoklasse 
	this.alive = alive;		//possible states are true && false
	this.tmpAlive; 
	}
function createField(){
		x = document.values.X.value;
		y = document.values.Y.value;
	var xy = x*y,
		tmp = 1;
		
	for (var i = 0; i < xy; i++)
	{	
		var br = document.createElement ("br");
		var cell = document.createElement ("span");
		
		cell.setAttribute("id", i);
		cell.setAttribute("onclick", "mark(this.id);"); // eventhandling muss anders
		cell.setAttribute("class", "cell");
		arCells[i] = new cCell(false);
		arCells[i].tmpAlive = false;

		document.getElementById('Da_Game').appendChild(cell);
		//zeilenumbruch
		if ( i == (x*tmp)-1) {		//evt. durch modulo x ersetzen ??
			tmp++;
			document.getElementById('Da_Game').appendChild(br);
		};
	}
}
function mark(id){
	var tmpEl = document.getElementById(id);
	if (arCells[id].alive == false){
		arCells[id].alive = true;
		$(tmpEl).removeClass("cell").addClass("mark");
	}else if (arCells[id].alive == true){
		arCells[id].alive = false;
		$(tmpEl).removeClass("mark").addClass("cell");
	}
}
function run(){
	var timer;
	var frameTime = 1000/40;
	var loop = function() {
		draw();
	}
	setInterval(loop,frameTime);
}
function clear(timer){
	clearInterval(timer);
}
function draw(){
	document.getElementById("loopCount").innerHTML = (genCount);
	genCount++;
	for (var i = 0; i < arCells.length; i++) {
		var xInt = parseInt(x),
			y = arCells.length/xInt,
			nAlive = 0, 	//Aktuell lebende Nachbarn
			n0 = i, 		n1 = i+1, 			n2 = i-1,
			n3 = (i)-x,		n4 = (i+1)-x,		n5 = (i-1)-x,
			n6 = i+xInt,	n7 = (i+1)+xInt,	n8 = (i-1)+xInt;	//Zähler für Nachbarzellen Wertzugriff

		for (var z = y; z > 0; z--) {
			if (i == (z*xInt)-xInt){
				n2 = n2 + xInt;
				n5 = n5 + xInt;
				n8 = n8 + xInt;
			} else if (i == (z*xInt)-1) {
				n1 = n1 - xInt;
				n4 = n4 - xInt;
				n7 = n7 - xInt;
			};
		};

		if (n1 >= arCells.length){ n1 = n1 - arCells.length};	
		if (n2 < 0){ n2 = n2 + arCells.length}; 	
		if (n3 < 0){ n3 = n3 + arCells.length};						
		if (n4 < 0){ n4 = n4 + arCells.length};						
		if (n5 < 0){ n5 = n5 + arCells.length};						
		if (n6 >= arCells.length){ n6 = n6 - arCells.length};		
		if (n7 >= arCells.length){ n7 = n7 - arCells.length};		
		if (n8 >= arCells.length){ n8 = n8 - arCells.length};
		
		
		if (arCells[n1].alive == true){nAlive++;};
		if (arCells[n2].alive == true){nAlive++;};
		if (arCells[n3].alive == true){nAlive++;};
		if (arCells[n4].alive == true){nAlive++;};
		if (arCells[n5].alive == true){nAlive++;};
		if (arCells[n6].alive == true){nAlive++;};
		if (arCells[n7].alive == true){nAlive++;};
		if (arCells[n8].alive == true){nAlive++;};
		
		if 		(arCells[i].alive == false && nAlive == 3)					{arCells[i].tmpAlive = true;}
		else if (arCells[i].alive == true && nAlive < 2)					{arCells[i].tmpAlive = false;}
		else if (arCells[i].alive == true && nAlive == 2 || nAlive == 3) 	{arCells[i].tmpAlive = true;}
		else if (arCells[i].alive == true && nAlive > 3) 					{arCells[i].tmpAlive = false;};
	};
	for (var i = 0; i < arCells.length; i++) {
	
		var tmpEl = document.getElementById(i);
		if (arCells[i].alive == true && arCells[i].tmpAlive == false ){
			$(tmpEl).removeClass("mark").addClass("cell");
		} else if (arCells[i].alive == false && arCells[i].tmpAlive == true){
			$(tmpEl).removeClass("cell").addClass("mark");
		}

		arCells[i].alive = arCells[i].tmpAlive;
	};
}
