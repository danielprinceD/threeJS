import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'
import '/style.css'
import stars from './img/stars.jpg'
import zoro from './img/zoro.jpg'
import rasengan from './img/rasengan3.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const luffyUrl = new URL('./img/luffy3.glb',import.meta.url)
const zoroUrl = new URL('./img/zoro3.glb',import.meta.url)
const logoUrl = new URL('./img/onepiecelogo.glb',import.meta.url)

const renderer = new THREE.WebGLRenderer()


renderer.setSize(window.innerWidth,window.innerHeight)

renderer.shadowMap.enabled=true

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const textLoad = new THREE.TextureLoader()

scene.background=textLoad.load(stars)

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
  map:textLoad.load(rasengan),
  wireframe:false,
});





const box= new THREE.Mesh(boxGeometry,boxMaterial)

// Adding GUI in model



const gui = new dat.GUI()
const options= {
   sphereColor:'#fff',
   wireFrame:false,
   speed:0.015,
   spotAngle:0.5,
   spotPnumbra:0,
   spotIntensity:200

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

const ambient = new THREE.AmbientLight('0xffff00',0.5)
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


const spot = new THREE.SpotLight(0xffffff,2)
spot.position.y=25
spot.position.z=5

const spotHelp=new THREE.SpotLightHelper(spot)
spot.castShadow=true

scene.add(spot)

scene.add(spotHelp)



const zoroGeometry = new THREE.BoxGeometry(5,5,5)
const zoroMaterial = new THREE.MeshBasicMaterial(
  {
    map:textLoad.load(zoro)
  }
)
const zoroBox= new THREE.Mesh(zoroGeometry,zoroMaterial)
zoroBox.castShadow=true
zoroBox.position.set(0,2.6,-5)
scene.add(zoroBox)

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



//Cursor 

const mousePointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster()
window.addEventListener('mousemove',(e)=>
{
  mousePointer.x=(e.clientX/window.innerWidth)*2-1
  mousePointer.y=-(e.clientY/window.innerHeight)*2+1
})


const ballGeo =new THREE.SphereGeometry()
const ballMat = new THREE.MeshBasicMaterial(
{
  color:'0xff00f0'
}  
)

const ball=new THREE.Mesh(ballGeo,ballMat)
ball.position.x=10
zoroBox.add(ball)

const ballObj=new THREE.Object3D()
scene.add(ballObj)
ballObj.add(ball)
ballObj.position.y=3



const boxId = box.id;

zoroBox.name='thezoro'
let step=0


// Plane geometry 2

const plane2Geo = new THREE.PlaneGeometry(10,10,10,10)
const plane2Mat = new THREE.MeshBasicMaterial(

  {
    color:0xffffff,
    wireframe:true
  }
)

const plane2 = new THREE.Mesh(plane2Geo,plane2Mat)
plane2.position.set(10,10,10)
plane2.rotation.x=-0.5*Math.PI
scene.add(plane2)

console.log(plane2.geometry.attributes.position.array);
// console.log(plane2.geometry.attributes.position.array[]+=10);



//Asset Loader

const assetLoader = new GLTFLoader();
assetLoader.load(luffyUrl.href,function(gltf){
  const luffy = gltf.scene;
  
  luffy.position.z=7
  luffy.position.y=3
  luffy.rotation.y=10

  luffy.receiveShadow=true
  scene.add(luffy);

  

},undefined,function(){
  console.log("error");
})


assetLoader.load(zoroUrl.href,function(gltf){
  const zoro3 = gltf.scene;
  zoro3.position.z=4
  scene.add(zoro3);

},undefined,function(){
  console.log("error");
})


assetLoader.load(logoUrl.href,function(gltf){
  const logo3 = gltf.scene;
  logo3.position.y=0.2
  scene.add(logo3);
  


},undefined,function(){
  console.log("error");
})




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


raycaster.setFromCamera(mousePointer,camera)
zoroBox.rotation.y+=0.1/10
ballObj.rotation.y+=0.09/10


const intersects=raycaster.intersectObjects(scene.children)
for (let i=0 ; i<intersects.length;i++)
{
  if(intersects[i].object.id===boxId)
  {
    intersects[i].object.material.color.set(0x000000)
  }


  

}

window.addEventListener('resize',()=>{
  camera.aspect(window.innerWidth/window.innerHeight)
  
})


  step+=options.speed
  renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate)

