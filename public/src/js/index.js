import * as THREE from '../dependencies/three.module.js'
import { GLTFLoader } from '../dependencies/GLTFLoader.js'

import { loadModels, prepModelsAndAnimations } from './loaders.js'
import { spawnModel } from './spawners.js'
import { createCube } from './cube.js'
import mouseControls from './controls/mouseControls.js'

const loadingElem = document.querySelector('#loading')

let scene, camera, renderer, clock, controls
let fox

function init() {
    
    loadingElem.style.display = 'none'
    setUp()
    // loadFox()
    const models = prepModelsAndAnimations()
    fox = spawnModel(scene, models["fox"], 0, 0, 0)
    
    playNextAction(fox.mixerInfo)
    // playNextAction(fox.mixerInfo)

    console.log('models :>> ', models)

    update();
}



const update = function () {
    requestAnimationFrame(update);

    const delta = clock.getDelta()
    
    fox.mixerInfo.mixer.update(delta)



    // Zoom out effect
    // camera.position.z += 0.04
    
    renderer.render(scene, camera);
};

function playAnimationByName(name) { } // TODO
function playNextAction(mixerInfo) {
    const {actions, actionNdx} = mixerInfo;
    const nextActionNdx = (actionNdx + 1) % actions.length;
    mixerInfo.actionNdx = nextActionNdx;
    actions.forEach((action, ndx) => {
      const enabled = ndx === nextActionNdx;
      action.enabled = enabled;
      if (enabled) {
        action.play();
      }
    });
  }

function setUp(){
  clock = new THREE.Clock()
  // Scene 
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x222222)

  // Camera
  const fov = 45
  const aspect = 2  // the canvas default
  const near = 0.1
  const far = 100
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 10, 40);

  // Renderer
  const canvas = document.getElementById('3DScreen');
  renderer = new THREE.WebGLRenderer({canvas})
  renderer.setSize(window.innerWidth, window.innerHeight)
  //document.body.appendChild(renderer.domElement)
  
  // Light
  var light = new THREE.DirectionalLight(0xfdfdfd, 2)
  light.position.set(2, 2, 1).normalize()
  scene.add(light)

  // Controls
  controls = mouseControls(scene, camera)

  window.onresize = () => { resizeScreen(renderer)}
}

function resizeScreen(renderer) {
    renderer.setSize(window.innerWidth, window.innerHeight)

    console.log("HALLÅÅ!?")
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}

function resizeRendererToDisplaySize(renderer) {
  
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  // console.log(width, canvas.width)
  if (canvas.width !== canvas.clientWidth) {
    console.log("NU!")
  }
  if (needResize) {
    renderer.setSize(width, height, false)
    console.log("Resized")
  }
  return needResize
}


window.onload = function () {
    loadModels(init)
}
