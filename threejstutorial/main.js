import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)

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
  
  camera.position.set(0,0,30)
  orbit.update()

//Ball 

const boxGeometry = new THREE.SphereGeometry(3,10,10)
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0xff0000,
  wireframe:true,
});



const box= new THREE.Mesh(boxGeometry,boxMaterial)

// Adding GUI in model
const gui =new dat.GUI()
const options = {
  sphereColor : "#ff0000"
}
gui.addColor(options,'sphereColor').onchange(
    function(e){
      box.material.color.set(e)
    }
  )




scene.add(box)
box.position.y=5;
box.position.x=7;

//plane Geometry

const planeGeometry = new THREE.PlaneGeometry(25,25)
const planematerial = new THREE.MeshBasicMaterial(
  {side : THREE.DoubleSide}
)

const plane = new THREE.Mesh(planeGeometry,planematerial)
plane.rotation.x=-0.5*Math.PI
scene.add(plane)



//Grid Helper

const gridhelper = new THREE.GridHelper()
scene.add(gridhelper)


function animate()
{
  box.rotation.x +=0.09/10;
  box.rotation.y +=0.09/10;
  box.rotation.z +=0.09/10;

  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)

