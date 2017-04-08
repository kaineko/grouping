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
			color.addColorStop(0, 'rgba(0,250,250,1.0)');
			color.addColorStop(0.3, 'rgba(0,250,250,0.6)');
			color.addColorStop(0.7, 'rgba(0,250,250,0.3)');
			color.addColorStop(1.0, 'rgba(0,250,250,0.1)');
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, size, 0,2*Math.PI,true);
			ctx.fill();
		}
		function clear(){
			for(var s = 0 ; s <= 10; s++){
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
		 
		 
		  //ビームの当たり判定を作成 
		 setInterval(checkSnowcrash,10);
		function checkSnowcrash(){
			var imagedata1 = ctx.getImageData(x-size,y-size,1,1);
			var imagedata2 = ctx.getImageData(x-size,y,1,1);
			var imagedata3 = ctx.getImageData(x-size,y+size,1,1);
			var imagedata4 = ctx.getImageData(x,y+size,1,1);
			var imagedata5 = ctx.getImageData(x+size,y-size,1,1);
    		var imagedata6 = ctx.getImageData(x+size,y,1,1);
			var imagedata7 = ctx.getImageData(x+size,y+size,1,1);

						if(imagedata1.data[0] > 250){
							clear();
							moveStop();
						} else if(imagedata2.data[0] > 250){
							clear();
							moveStop();
						} else if(imagedata3.data[0] > 250){
							clear();
							moveStop();
						} else if(imagedata4.data[0] > 250){
							clear();
							moveStop();
						} else if(imagedata5.data[0] > 250){
							clear();
							moveStop();
						} else if(imagedata6.data[0] > 250){
							clear();
							moveStop();
						} else if(imagedata7.data[0] > 250){
							clear();
							moveStop();
						}
					
		}
		  
	  }
		
		function birthPlace(){
			var snowNum =Math.floor(3.1*Math.random());
			for(var i = 0; i < snowNum ; i++){
				var place = w * Math.random() 
				snowStart(place,0);
			}
		}
		var xspeedCoe = 0.7;
		var yspeedCoe = 0.6;
       
		function speedchange(){
		yspeedCoe = 1;
		xspeedCoe = yspeedCoe*(Math.random()-Math.random());
		birthRateChange();
		}
		
		var birthRate = 1000
		function birthRateChange(){
			if (Math.abs(xspeedCoe) >1.0 && yspeedCoe > 1.0  ){
				birthRate = 1000;
			} else if (Math.abs(xspeedCoe) > 0.5 && yspeedCoe > 1.0  ){
				birthRate = 1000;
			} else if (Math.abs(xspeedCoe) >= 0 && yspeedCoe > 1.0  ){
				birthRate = 1000;
			} else if (yspeedCoe >= 0.7 && yspeedCoe < 1.0  ){
				birthRate = 1000;
			} else if (yspeedCoe >= 0.6 && yspeedCoe < 0.7  ){
				birthRate = 1000;
			} else if (yspeedCoe <0.6 ){
				birthRate = 1000;
 			}
		}
		birthPlace();
		function again(){
		setTimeout(birthPlace,birthRate);
		setTimeout(again,birthRate);
		}
		again();
		setInterval(speedchange,10000);
		
		//操作ボックスを作成
		alert('【ボックス操作方法】 \n wまたは↑：前進 \n sまたは↓：後退 \n aまたは←：左へ移動 \n dまたは→：右へ移動\n x：ビームを発射(1度に1発のみ。30回まで発射可能。) \n\n 雪に当たらないようボックスを操作して下さい。\n\n注）IEまたはEdgeでは矢印キーは使用出来ません。\n（Firefox以外のブラウザの使用を推奨します。）')
		var ctx = canvas.getContext('2d');
		
		var boxWidth = 40
		var boxHeight =30;
		var boxX = (w - boxWidth)/2;
		var boxY = h - boxHeight;
		
		}
		document.onkeydown = function(e){
			if(e.key === 'd' || e.key === 'ArrowRight'){
				ctx.fillStyle = '#000';
				ctx.fillRect(boxX-1,boxY-1,boxWidth+2,boxHeight+2);
				if (boxX + boxWidth < w ){
					boxX += 20;
				}
				ctx.fillStyle = '#0F0';
				ctx.fillRect(boxX,boxY,boxWidth,boxHeight);
			} else if(e.key === 'a' || e.key === 'ArrowLeft'){
				ctx.fillStyle = '#000';
				ctx.fillRect(boxX-1,boxY-1,boxWidth+2,boxHeight+2);
				if (boxX > 0 ){
					boxX -= 20;
				}
				ctx.fillStyle = '#0F0';
				ctx.fillRect(boxX,boxY,boxWidth,boxHeight);
			} else if(e.key ==='w' || e.key === 'ArrowUp'){
				ctx.fillStyle = '#000';
				ctx.fillRect(boxX-1,boxY-1,boxWidth+2,boxHeight+2);
				if (boxY-boxHeight > 0 ){
					boxY -= 20;
				}
				ctx.fillStyle = '#0F0';
				ctx.fillRect(boxX,boxY,boxWidth,boxHeight);
			} else if (e.key ==='s' || e.key === 'ArrowDown'){
				ctx.fillStyle = '#000';
				ctx.fillRect(boxX-1,boxY-1,boxWidth+2,boxHeight+2);
				if (boxY + boxHeight < h ){
					boxY += 20;
				}
				ctx.fillStyle = '#0F0';
				ctx.fillRect(boxX,boxY,boxWidth,boxHeight);
			}  else if(e.key === 'x'){
				if( beamCount === 0){
					beamX = boxX+boxWidth/4;
					beamY = boxY-boxHeight;
					beamSet();
				} else if(beamCount < 30 && beamY <0 ){
					beamX = boxX+boxWidth/4;
					beamY = boxY-boxHeight;
					beamSet();
				}
			}
		}
		ctx.fillStyle = '#0F0';
		ctx.fillRect(boxX,boxY,boxWidth,boxHeight);
		// ボックスのあたり判定を作成
		setInterval(checkBoxcrash,10);
		function checkBoxcrash(){
			var imagedata11 = ctx.getImageData(boxX,boxY,1,1);
			var imagedata12 = ctx.getImageData(boxX+boxWidth/2,boxY,1,1);
			var imagedata13 = ctx.getImageData(boxX+boxWidth,boxY,1,1);
			var imagedata14 = ctx.getImageData(boxX,boxY+boxHeight/2,1,1);
			var imagedata15 = ctx.getImageData(boxX,boxY+boxHeight,1,1);
    		var imagedata16 = ctx.getImageData(boxX+boxWidth/2,boxY+boxHeight,1,1);
			var imagedata17 = ctx.getImageData(boxX+boxWidth,boxY+boxHeight,1,1);
			var imagedata18 = ctx.getImageData(boxX+boxWidth/2,boxY+boxHeight/2,1,1);
						if(imagedata11.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata12.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata13.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata14.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata15.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata16.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata17.data[2] != 0){
							alert('雪に接触しました！');
						} else if(imagedata18.data[2] != 0){
							alert('雪に接触しました！');
						} 
					
		}
		//ビーム発射
		var beamCount = 0;
		var beamX = boxX+boxWidth/4;
		var beamY = boxY-boxHeight;
		function beamSet(){
			beamCount += 1 ;
			beamStart();
		}
		function beamClear(){
			for (var b =1; b <= 10; b++){
			ctx.fillStyle="#000";
			ctx.fillRect(beamX-1,beamY+19,(boxWidth/2)+2,(boxHeight/2)+2);
			}
			if(beamY > 0){
				beamStart();
			} 
		}
		function beamStart(){
			ctx.fillStyle="#F00";
			ctx.fillRect(beamX,beamY,boxWidth/2,boxHeight/2);
			setTimeout(beamMove,100);
		}
		function beamMove(){
			beamY -= 20;
			beamClear();
		}
}
