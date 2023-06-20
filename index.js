import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { ImprovedNoise } from './ImprovedNoise.js';


var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false,
    //makeGlobal: false
}) // antes tenía .synth aqui 

const elCanvas = document.getElementById( 'myCanvas');
elCanvas.style.display = 'none';     
let vit = new THREE.CanvasTexture(elCanvas);


    var cursorX;
    var cursorY;
    document.onmousemove = function(e){
	cursorX = e.pageX;
	cursorY = e.pageY;
}

const mouse = [ .5, .5 ];

// osc(8, 0, 0 ).rotate(0.1).modulateScrollY(o0, 0.9).out(o0); 
osc(10, ()=>cursorX*0.0001 ).rotate(1, 0.3, 0.5).modulateScrollX(o0, 1.01).out(o0);

let cubos = [];


const geometry = new THREE.SphereGeometry(2, 3, 4 );
// Buffergeometry 
// console.log(geometry.attributes.position); 
const material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, map:vit} );
let pX = [], pY = [], pZ = []; 


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight/2), 0.1, 1000 );
camera.position.z = 4; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight/2 );
let container = document.getElementById('three');

container.appendChild( renderer.domElement );


for(let i = 0; i < 50; i++){
  
	cubos[i] = new THREE.Mesh( geometry, material2 );

	var posX, posY, posZ;
	var theta1 = Math.random() * (Math.PI*2);
	var theta2 = Math.random() * (Math.PI*2); 
	posX = Math.cos(theta1) * Math.cos(theta2)*1;
	posY = Math.sin(theta1)*1;
	posZ = Math.cos(theta1) * Math.sin(theta2)*1;
	pX[i] = posX;
	pY[i] = posY;
	pZ[i] = posZ; 
    cubos[i].position.x = pX[i] * 3 ; 
    cubos[i].position.y = pY[i] * 3;
    cubos[i].position.z = pZ[i] *  3;
	cubos[i].rotation.x = Math.random() * 360; 
	cubos[i].rotation.y = Math.random() * 360; 
	cubos[i].rotation.z = Math.random() * 360; 
	scene.add( cubos[i] );	
}

window.addEventListener( 'mousemove', onMouseMove );


// camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    
    vit.needsUpdate = true; 
    
    var time2 = Date.now() * 0.005;

    // para cuando no hay pads 
    camera.position.x = Math.sin( Math.PI * ( mouse[ 0 ] - .5  )) *10;
    camera.position.y = Math.sin( time2 * 0.125/4 ) * 0.5; 
    camera.position.z = Math.cos( time2 * 0.125/8 ) * - 0.5;

    camera.lookAt(0, 0, 0);


    let perlin = new ImprovedNoise();

    for( var i = 0; i < 50   ; i++){
	
	let d = perlin.noise(pX[i]*0.5*(time*0.5),
			     pY[i]*0.5*(time*0.5),
			     pZ[i]*0.5*(time*0.5) ) *1

	cubos[i].position.x = (pX[i]*1)* (1+d);
	cubos[i].position.y = (pY[i]*1)* (1+d);
	cubos[i].position.z = (pZ[i]*1)* (1+d) ;

	
	cubos[i].scale.x = 1* (d+1)*1;
	cubos[i].scale.y = 1* (d+1)*1;
	cubos[i].scale.z = 1* (d+1)*1;

	/*
	cubos[i].rotation.x += 1*(d*1)*0.25/4;
	cubos[i].rotation.y -= 1* (d*1)*0.25/4;
	cubos[i].rotation.z += 1* (d*1)* ((Tone.dbToGain( an.getValue()[i%32])*500) );
	*/
	
	//mboo[i].scale.y = (1*d) * ((Tone.dbToGain( an.getValue()[i%32])*50000))
	 
    }		

    
    renderer.render( scene, camera );
}

function onMouseMove( ev ) {

    mouse[ 0 ] = ev.clientX / window.innerWidth;
    mouse[ 1 ] = ev.clientY / window.innerHeight;
    
}
    
animate();

    
