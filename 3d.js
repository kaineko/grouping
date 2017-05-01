var args = {
	w: window.innerWidth,
	h: window.innerHeight,
	cam: null,
	scn: null,
	lt: null,
	lt2:null,
	anlt:null,
	cube: null,
	cube2: null,
	cube3:null,
	cube4:null,
	wall:null,
	renderer: null
}

function set_renderer(){
	
	args.renderer = new THREE.WebGLRenderer();
	args.renderer.setSize(args.w, args.h);
	args.renderer.setClearColor(0x333333);
	
	document.getElementById('cv').appendChild(args.renderer.domElement);
}

	var cameraX = 0;
	var cameraY = 0;
	var cameraZ = -50;
	var cameraToX = 0;
	var cameraToY = 0;
	var cameraToZ = 0;

function camera(){
	args.cam = new THREE.PerspectiveCamera (100, args.w/args.h);
	
	args.cam.position.x = cameraX;
	args.cam.position.y = cameraY;
	args.cam.position.z = cameraY;
	
	args.cam.lookAt({x:0,y: 0,z: 0 })
}

function scene(){
	args.scn = new THREE.Scene();
}

function light(){
	args.lt = new THREE.DirectionalLight();
	args.lt.position.set(0, 50,0);
	args.scn.add(args.lt);
	
	args.lt2 = new THREE.DirectionalLight(0xffffff);
	args.lt2.position.set(0, 1,0);
	args.scn.add(args.lt2);
	
	args.anlt = new THREE.AmbientLight(0xFFFFFF,0.5);
	args.scn.add(args.anlt);
	
}

function set_obj(){
	
	args.cube = new THREE.Mesh(
		new THREE.CubeGeometry(30,30,30),
		new THREE.MeshLambertMaterial({color:0x66FF66})
	);
	args.cube.position.set(0,0,0);
	args.scn.add(args.cube);
	
	
	args.cube2 = new THREE.Mesh(
		new THREE.CubeGeometry(30,30,30),
		new THREE.MeshLambertMaterial({color:0x66FF66})
	);
	args.cube2.position.set(0,70,-200);
	args.scn.add(args.cube2);
	
	
	
	args.cube3 = new THREE.Mesh(
		new THREE.CubeGeometry(100,20,30),
		new THREE.MeshLambertMaterial({color:0xFF6600})
	)
	args.cube3.position.set(-199,0,-300);
	args.scn.add(args.cube3);
	
	args.cube4 = new THREE.Mesh(
		new THREE.CubeGeometry(999999,0,999999),
		new THREE.MeshLambertMaterial({color:0xFF66FF})
	)
	args.cube4.position.set(0, -200, 0);
	args.scn.add(args.cube4);
	
	args.wall = new THREE.Mesh(
		new THREE.CubeGeometry(0,999999,999999),
		new THREE.MeshLambertMaterial({color:0xFF0000})
	)
	args.wall.position.set(-200, 0, 0);
	args.scn.add(args.wall);
	
	
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
		args.cube3.rotation.y += 	0;
	},30);
	
	var keyStatus = [0,0,0];
	
	
	document.onkeydown = function(e){
		console.log(e.key);
		if(e.key === 'd'){
			keyStatus[0] = 1;
		}
		if(e.key === 'a'){
			keyStatus[0] = -1;
		}
		if(e.key === 's'){
			keyStatus[2] = 1;
		}
		if(e.key === 'w'){
			keyStatus[2] = -1;
		}
		if(e.key === 'k'){
			keyStatus[1] = -1;
		}
	}
	
	setInterval(function(){
		if(keyStatus[0] === 1){
			args.cam.position.x += 10;
		}
		if(keyStatus[0] === -1){
			if(args.cam.position.x > -190){
				args.cam.position.x -= 10;
			}
		}
		if(keyStatus[2] === 1){
			args.cam.position.z += 10;
		}
		if(keyStatus[2] === -1){
			args.cam.position.z -= 10;
		}
		if(keyStatus[1] === 1){
			args.cam.position.y += 10;
		}
		if(keyStatus[1] === -1){
			args.cam.position.y -= 10;
		}
	},50)
	
	document.onkeyup = function(e){
		console.log(e.key);
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
		if(e.key === 'k'){
			keyStatus[1] = 0;
		}
		if(e.key === 'Shift'){
			keyStatus[1] = 1;
			setTimeout(jump1,500);
		}
		function jump1(){
			args.cam.position.y = 90;
			keyStatus[1] = 0;
			setTimeout(jump2,50);
		}
		function jump2(){
			args.cam.position.y = 80;
			setTimeout(jump3,50);
		}
		function jump3(){
			args.cam.position.y = 70;
			setTimeout(jump4,50);
		}
		function jump4(){
			args.cam.position.y = 60;
			setTimeout(jump5,50);
		}
		function jump5(){
			args.cam.position.y = 50;
			setTimeout(jump6,50);
		}
		function jump6(){
			args.cam.position.y = 40;
			setTimeout(jump7,50);
		}
		function jump7(){
			args.cam.position.y = 30;
			setTimeout(jump8,50);
		}
		function jump8(){
			args.cam.position.y = 20;
			setTimeout(jump9,50);
		}
		function jump9(){
			args.cam.position.y = 10;
			setTimeout(jump10,50);
		}
		function jump10(){
			args.cam.position.y = 0;
		}	
	}
	setInterval(function(){
		var testX2 = Math.random()*100;
		var testY2 = Math.random()*1000;
		var testZ2 = Math.random()*-200;
		args.cube2.position.set(testX2,testY2,testZ2);
		var i = 1;
		if (i === 1){
			var testX += 10;
			if( testX >100){
				i= -1;
			}
		} else if (i === -1){
			var testX += 10;
			if(testX < -100){
				i = 1;
			}
		}
		args.cube.position.set(testX,0,0);
		args.renderer.render(args.scn,args.cam);
	},10);
}
