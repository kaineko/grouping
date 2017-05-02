var args = {
	w: window.innerWidth,
	h: window.innerHeight,
	renderer: null,
	scn: null,
	cam: null,
	lt: null,
	anlt:null,
	floor:null,
	wall:null,
	wall2:null,
	wall3:null,
	wall4:null,
	cube: null,
	cube2: null,
	cube3:null,
	range:null,
	pX:null,
	pY:null,
	pZ:null
}
var instances = [];

function set_renderer(){
	args.renderer = new THREE.WebGLRenderer();
	args.renderer.setSize(args.w, args.h);
	args.renderer.setClearColor(0x00FFFF);
	document.getElementById('cv').appendChild(args.renderer.domElement);
}

	var cameraX = 0;
	var cameraY = 0;
	var cameraZ = 0;
	var cameraToX = cameraX + 0;
	var cameraToY = cameraY + 0;
	var cameraToZ = cameraZ + (-1);

function scene(){
	args.scn = new THREE.Scene();
}

function camera(){
	args.cam = new THREE.PerspectiveCamera (100, args.w/args.h);
	
	args.cam.position.x = cameraX;
	args.cam.position.y = cameraY;
	args.cam.position.z = cameraZ;
	args.cam.lookAt({x:cameraX + cameraToX,y:cameraY + cameraToY,z:cameraZ + cameraToZ });
}


function light(){
	
	args.lt = new THREE.DirectionalLight(0xffffff);
	args.lt.position.set(0, 1,0);
	args.scn.add(args.lt);
	
	args.anlt = new THREE.AmbientLight(0xFFFFFF,0.5);
	args.scn.add(args.anlt);
	
}



function set_obj(){
	
	args.floor = new THREE.Mesh(
		new THREE.CubeGeometry(999999,0,999999),
		new THREE.MeshLambertMaterial({color:0xFF66FF})
	)
	args.floor.position.set(0, -100, 0);
	args.scn.add(args.floor);
	
	args.wall = new THREE.Mesh(
		new THREE.CubeGeometry(0,99999,99999),
		new THREE.MeshLambertMaterial({color:0xFF0000})
	)
	args.wall.position.set(-200, 0, 0);
	args.scn.add(args.wall);
	
	args.wall2 = new THREE.Mesh(
		new THREE.CubeGeometry(0,99999,99999),
		new THREE.MeshLambertMaterial({color:0xFF0000})
	)
	args.wall2.position.set(800, 0, 0);
	args.scn.add(args.wall2);
		
	args.wall3 = new THREE.Mesh(
		new THREE.CubeGeometry(100,970,100),
		new THREE.MeshLambertMaterial({color:0x33AA33})
	)
	args.wall3.position.set(100, 500, -900);
	args.scn.add(args.wall3);
	
	args.wall4 = new THREE.Mesh(
		new THREE.CubeGeometry(2000,500,0),
		new THREE.MeshLambertMaterial({color:0xAA00AA})
	)
	args.wall4.position.set(0, 0, -1900);
	args.scn.add(args.wall4);
	
	
	
	args.cube = new THREE.Mesh(
		new THREE.CubeGeometry(30,30,30),
		new THREE.MeshLambertMaterial({color:0x66FF66})
	);
	args.cube.position.set(100,0,-140);
	args.scn.add(args.cube);
	
	
	args.cube2 = new THREE.Mesh(
		new THREE.CubeGeometry(30,30,30),
		new THREE.MeshLambertMaterial({color:0x2200FF})
	);
	args.cube2.position.set(0,70,-100);
	args.scn.add(args.cube2);
	
	
	
	args.cube3 = new THREE.Mesh(
		new THREE.CubeGeometry(100,20,30),
		new THREE.MeshLambertMaterial({color:0xFF6611})
	)
	args.cube3.position.set(-150,0,-160);
	args.scn.add(args.cube3);
	
	var sphere;
	for (p = 1; p < 1001 ; p++){
		range = Math.random()*15;
		args.sphere = new THREE.Mesh(
			new THREE.SphereGeometry(range,range,range),
			new THREE.MeshLambertMaterial({color:0xFFFF00})
		)
		var pX = -200+Math.random()*1000;
		var pY = 20+Math.random()*300;
		var pZ = 100+Math.random()*-1000;
		args.sphere.position.set(pX,pY,pZ);
		instances.push(args.sphere);
		args.scn.add(args.sphere);
	}
	
}


window.onload = function(){
	set_renderer();
	camera();
	scene();
	light();
	set_obj();
	
	args.renderer.render(args.scn, args.cam);
	
	
setInterval(function(){
		args.cube.rotation.x += 0.05;
		args.cube.rotation.y += 0.10;
		args.cube3.rotation.x += 0.90;
		args.cube3.rotation.y += 0;
	},30);
	
	var keyStatus = [0,0,0,0,0];
	
	var radian = 0;//水平面での角度
	var radian2 = 0;//鉛直面での角度
	document.onkeypress = function(e){
		console.log(e.key);
		if(e.key === 'd'){
			keyStatus[0] = 1;
		}
		if(e.key === 'a'){
			keyStatus[0] = -1;
		}
		if(e.key === 'w'){
			keyStatus[2] = 1;
		}
		if(e.key === 's'){
			keyStatus[2] = -1;
		}
		if(e.key ==='i'){
			if(radian2 < (86/360)*2*Math.PI){
				keyStatus[3] = 1;
				radian2 += (4/360)*2*Math.PI
			}
		}
		if(e.key ==='k'){
			if(radian2  >= -(86/360)*2*Math.PI){
				keyStatus[3] = -1;
				radian2 -= (4/360)*2*Math.PI
			}
		}
		if(e.key ==='l'){
			keyStatus[4] = 1;
			radian += (4/360)*2*Math.PI
		}
		if(e.key ==='j'){
			keyStatus[4] = -1;
			radian -= (4/360)*2*Math.PI
		}
		
	}
	
	setInterval(function(){
			if(keyStatus[0] === 1){
				if(args.cam.position.x < -180){
					if(10*Math.cos(radian) < 0){
					} else{
						args.cam.position.x += 10*Math.cos(radian);
						args.cam.position.z += 10*Math.sin(radian);
						cameraX += 10*Math.cos(radian);
						cameraZ += 10*Math.sin(radian);
					}
				} else if (args.cam.position.x > 780){
					if(10*Math.cos(radian) > 0){
					} else{	   
						args.cam.position.x += 10*Math.cos(radian);
						args.cam.position.z += 10*Math.sin(radian);
						cameraX += 10*Math.cos(radian);
						cameraZ += 10*Math.sin(radian);
					}
				} else{
					args.cam.position.x += 10*Math.cos(radian);
						args.cam.position.z += 10*Math.sin(radian);
						cameraX += 10*Math.cos(radian);
						cameraZ += 10*Math.sin(radian);
				}
			}
			if(keyStatus[0] === -1){
				if(args.cam.position.x < -180){
					if(10*Math.cos(radian) > 0){
					} else{
						args.cam.position.x -= 10*Math.cos(radian);
						args.cam.position.z -= 10*Math.sin(radian);
						cameraX -= 10*Math.cos(radian);
						cameraZ -= 10*Math.sin(radian);
					}
				} else if (args.cam.position.x > 780){
					if(10*Math.cos(radian) < 0){
					} else{
						args.cam.position.x -= 10*Math.cos(radian);
						args.cam.position.z -= 10*Math.sin(radian);
						cameraX -= 10*Math.cos(radian);
						cameraZ -= 10*Math.sin(radian);
					}
				} else{
						args.cam.position.x -= 10*Math.cos(radian);
						args.cam.position.z -= 10	*Math.sin(radian);
						cameraX -= 10*Math.cos(radian);
						cameraZ -= 10*Math.sin(radian);
				}
			}
			if(keyStatus[1] === 1){
				args.cam.position.y += 10;
				cameraY += 10;
				args.cam.lookAt({x:cameraX + cameraToX,y:cameraY + cameraToY,z:cameraZ + cameraToZ });
			}
			if(keyStatus[1] === -1){
				args.cam.position.y -= 10;
				cameraY -= 10;
			}
			if(keyStatus[2] === 1){
				if(args.cam.position.x < -180){
					if(10*Math.sin(radian) < 0){
					} else{
						args.cam.position.x += 10*Math.sin(radian);
						args.cam.position.z -= 10*Math.cos(radian);
						cameraX += 10*Math.sin(radian);
						cameraZ -= 10*Math.cos(radian);
					} 
				} else if (args.cam.position.x > 780){
					if(10*Math.sin(radian) > 0){
					} else{
						args.cam.position.x += 10*Math.sin(radian);
						args.cam.position.z -= 10*Math.cos(radian);
						cameraX += 10*Math.sin(radian);
						cameraZ -= 10*Math.cos(radian);
					}
				} else {
					args.cam.position.x += 10*Math.sin(radian);
						args.cam.position.z -= 10*Math.cos(radian);
						cameraX += 10*Math.sin(radian);
						cameraZ -= 10*Math.cos(radian);
				}
			}
			if(keyStatus[2] === -1){
				if(args.cam.position.x < -180){
					if(10*Math.sin(radian) > 0){
					} else{
						args.cam.position.x -= 10*Math.sin(radian);
						args.cam.position.z += 10*Math.cos(radian);
						cameraX -= 10*Math.sin(radian);
						cameraZ += 10*Math.cos(radian);
					}
				}else if (args.cam.position.x > 780){
					if(10*Math.sin(radian) < 0){
					} else{
						args.cam.position.x -= 10*Math.sin(radian);
						args.cam.position.z += 10*Math.cos(radian);
						cameraX -= 10*Math.sin(radian);
						cameraZ += 10*Math.cos(radian);
					}
				} else {
					args.cam.position.x -= 10*Math.sin(radian);
						args.cam.position.z += 10*Math.cos(radian);
						cameraX -= 10*Math.sin(radian);
						cameraZ += 10*Math.cos(radian);
				}		
			}
			if(keyStatus[3] === 1){
				cameraToX = Math.sin(radian)*Math.cos(radian2);
				cameraToZ = -Math.cos(radian)*Math.cos(radian2);
				cameraToY = Math.sin(radian2)
				args.cam.lookAt({x:cameraX + cameraToX,y:cameraY + cameraToY,z:cameraZ + cameraToZ });
			}
			if(keyStatus[3] === -1){
				cameraToX = Math.sin(radian)*Math.cos(radian2);
				cameraToZ = -Math.cos(radian)*Math.cos(radian2);
				cameraToY = Math.sin(radian2)
				args.cam.lookAt({x:cameraX + cameraToX,y:cameraY + cameraToY,z:cameraZ + cameraToZ });
			}
			if(keyStatus[4] === 1){
				cameraToX = Math.sin(radian)*Math.cos(radian2);
				cameraToZ = -Math.cos(radian)*Math.cos(radian2);
				cameraToY = Math.sin(radian2);
				args.cam.lookAt({x:cameraX + cameraToX,y:cameraY + cameraToY,z:cameraZ + cameraToZ });
			}
			if(keyStatus[4] === -1){
				cameraToX = Math.sin(radian)*Math.cos(radian2);
				cameraToZ = -Math.cos(radian)*Math.cos(radian2);
				cameraToY = Math.sin(radian2);
				args.cam.lookAt({x:cameraX + cameraToX,y:cameraY + cameraToY,z:cameraZ 	+ cameraToZ });
			}
	},50)
	
	
	
	document.onkeyup = function(e){
		if(e.key === 'd'){
			keyStatus[0] = 0;
		}
		if(e.key === 'a'){
			keyStatus[0] = 0;
		}
		if(e.key === 's'){
			keyStatus[2] = 0;
		}
		if(e.key === 'w'){
			keyStatus[2] = 0;
		}
		if(e.key ==='ArrowUp'){
			keyStatus[3] = 0;
		}
		if(e.key ==='ArrowDown'){
			keyStatus[3] = 0;
		}
		if(e.key ==='ArrowRight'){
			keyStatus[4] = 0;
		}
		if(e.key ==='ArrowLeft'){
			keyStatus[4] = 0;
		}
	}
	
	setInterval(function(){
		var testX2 = Math.random()*100;
		var testY2 = Math.random()*100;
		var testZ2 = Math.random()*-200;
		args.cube2.position.set(testX2,testY2,testZ2);
	},300);
	
	
	var i = 1;
	var testX = 100;
	setInterval(function(){
				if (i === 1){
			testX += 0.5;
			if( testX >130){
				i= -1;
			}
		} else if (i === -1){
			testX -= 0.5;
			if(testX < -120){
				i = 1;
			}
		}
		args.cube.position.set(testX,0,-200);
		args.renderer.render(args.scn,args.cam);
	},10);
	
	setInterval(function(){
		for(var i = 0; i < instances.length; i++){
			var ballX = -200+Math.random()*1000;
			var ballY = 20+Math.random()*300;
			var ballZ = 100+Math.random()*-1000;
			instances[i].position.set(ballX,ballY,ballZ);
		}
	},100);
}
