import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'
import '/style.css'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)

renderer.shadowMap.enabled=true

document.body.appendChild(renderer.domElement);



const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
  )
  const orbit = new OrbitControls(camera,renderer.domElement)
  
  const axeshelper = new THREE.AxesHelper(5)
  scene.add(axeshelper)
  camera.position.set(0,5,20)
  orbit.update()
  


//Ball 

const boxGeometry = new THREE.SphereGeometry(3)
const boxMaterial = new THREE.MeshStandardMaterial({
  color:0xff0000,
  wireframe:false,
});




const box= new THREE.Mesh(boxGeometry,boxMaterial)

// Adding GUI in model



const gui = new dat.GUI()
const options= {
   sphereColor:'#fff',
   wireFrame:false,
   speed:0.015,
   spotAngle:0.2,
   spotPnumbra:0,
   spotIntensity:0

}


gui.addColor(options,'sphereColor').onChange(function(e) {
    box.material.color.set(e)
  }
)

gui.add(options,'wireFrame').onChange(function(e) {
    
  box.material.wireframe=e
  }
)

box.castShadow=true
gui.add(options,'speed',0,0.1)
gui.add(options,'spotAngle',0.02,2)
gui.add(options,'spotPnumbra',0,10)
gui.add(options,'spotIntensity',0,200)

scene.add(box)
box.position.x=-7;

//plane Geometry

const planeGeometry = new THREE.PlaneGeometry(25,25)
const planematerial = new THREE.MeshStandardMaterial(

  {color:0X362FD9,
    side : THREE.DoubleSide}
)



const plane = new THREE.Mesh(planeGeometry,planematerial)
plane.rotation.x=-0.5*Math.PI

plane.receiveShadow=true;

const ambient = new THREE.AmbientLight('0x000000',0.5)
scene.add(ambient)

// const direction = new THREE.DirectionalLight('0xffffff',4)
// scene.add(direction)
// direction.position.set(0,140,50)
// direction.castShadow=true
// direction.shadow.camera.top=100

// const dHelper = new THREE.DirectionalLightHelper(direction)
// scene.add(dHelper)



// const shadowCam=new THREE.CameraHelper(direction.shadow.camera)

// scene.add(shadowCam)


const spot = new THREE.SpotLight('0xffffff',100)
spot.position.y=25
spot.position.z=5
const spotHelp=new THREE.SpotLightHelper(spot)
spot.castShadow=true
scene.add(spot)

scene.add(spotHelp)




const planeOption={planeColor:'#fff'}

gui.addColor(planeOption,'planeColor').onChange(
  (e)=>
  {
    plane.material.color.set(e)
  }
)

scene.add(plane)


//Grid Helper

const gridhelper = new THREE.GridHelper(25,30)
scene.add(gridhelper)
let step=0

function animate()
{
  box.rotation.x +=0.19/100;
  box.rotation.y +=0.15/100;
  box.rotation.z +=0.10/10;
  box.position.y=10*Math.abs(Math.sin(step))+3
  box.position.x=10*(Math.cos(step))
  
  spot.angle=options.spotAngle
  spot.penumbra=options.spotPnumbra
  spot.intensity=options.spotIntensity

spotHelp.update()

  step+=options.speed
  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)

