window.onload = function () {
	var canvas = document.getElementById('movearea');
	
	var w = $('#wrapper').width();
	var h = $('#wrapper').height();
	$('#movearea').attr('width', w);
	$('#movearea').attr('height', h);

	if (canvas && canvas.getContext) {
	  function snowStart(x,y){
		    var size = 9+4*Math.random();
		function draw(){
			var color = ctx.createRadialGradient(x,y,0,x,y,size);
			color.addColorStop(0, 'rgba(255,255,255,0.9)');
			color.addColorStop(0.3, 'rgba(255,255,255,0.6)');
			color.addColorStop(0.7, 'rgba(255,255,255,0.3)');
			color.addColorStop(1.0, 'rgba(255,255,255,0.1)');
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, size, 0,2*Math.PI,true);
			ctx.fill();
		}
		function clear(){
			for(var s = 0 ; s < 10; s++){
				ctx.beginPath();
				ctx.fillStyle = '#000';
				ctx.strokeStyle= '#000';
				ctx.arc(x, y, size,0,2*Math.PI,true);
				ctx.stroke();	
				ctx.fill();
			}
		}
		function move(){
			var xBlur = Math.random()-Math.random();
			var yBlur = Math.random();
			var xSpeed = xspeedCoe+xBlur;
			var ySpeed = yspeedCoe+yBlur;
			if(x >= 0 && x <= w && y >= 0 && y <= h){
				clear();
				x += xSpeed;
				y += ySpeed*yspeedCoe;
				draw();
			} else if (x < w && y > h){
				clear();
				moveStop();
			} else if (x > w && y < h ){
				clear();
				x = 0;
			} else if ( x > w && y > h){
				clear();
				moveStop();
			} else if ( x < 0 && y < h){
				clear();
				x = w;
			}
		}
		  var snowMove
		  function moveStart(){
			  snowMove = setInterval(move,10);
		  }
		  function moveStop(){
			  clearInterval(snowMove);
		  }
		  
		var ctx = canvas.getContext('2d');
		draw();
		moveStart();
	  }
		
		function birthPlace(){
			var snowNum =Math.floor(3.1*Math.random());
			for(var i = 0; i < snowNum ; i++){
				var place = w * Math.random() 
				snowStart(place,0);
			}
		}
		var xspeedCoe = 0.7;
		var yspeedCoe = 0.5;
       
		function speedchange(){
		yspeedCoe = 1+(Math.random()-Math.random())/2;
		xspeedCoe = yspeedCoe*(Math.random()-Math.random());
		birthRateChange();
			console.log('birthRate'+birthRate);
			console.log('x:'+xspeedCoe);
			console.log('y:'+yspeedCoe);
		}
		
		var birthRate = 300
		function birthRateChange(){
			if (Math.abs(xspeedCoe) >1.0 && yspeedCoe > 1.0  ){
				birthRate = 400;
			} else if (Math.abs(xspeedCoe) > 0.5 && yspeedCoe > 1.0  ){
				birthRate = 300;
			} else if (Math.abs(xspeedCoe) >= 0 && yspeedCoe > 1.0  ){
				birthRate = 200;
			} else if (yspeedCoe >= 0.7 && yspeedCoe < 1.0  ){
				birthRate = 1100;
			} else if (yspeedCoe >= 0.6 && yspeedCoe < 0.7  ){
				birthRate = 1600;
			} else if (yspeedCoe <0.6 ){
				birthRate = 2100;
 			}
		}
		setInterval(birthPlace,birthRate);
		setInterval(speedchange,3000);
    }
}