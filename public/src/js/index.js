import * as THREE from '../dependencies/three.module.js'
import { GLTFLoader } from '../dependencies/GLTFLoader.js'

import { loadModels, prepModelsAndAnimations } from './loaders/loaders.js'

import MouseControlManager from './controls/mouseControls.js'
import KeyboardInputManager from './controls/keyboardInputManager.js'

import Ground from './componentSystem/components/ground.js'
import Player from './componentSystem/components/player.js'
import GameObjectManager from './componentSystem/gameObjectManager.js'

const loadingElem = document.querySelector('#loading')

let scene, camera, renderer, clock, mouseControls
let fox

let gameObjectManager, keyboardInputManager

const globals = {
  time: 0,
  deltaTime: 0,
};

function init() {
    
    loadingElem.style.display = 'none'
    setUp()
    
    // loadFox()
    const models = prepModelsAndAnimations()
    console.log('Loaded and prepped models :>> ', models);

    // Create new gameObject
    const player = gameObjectManager.createGameObject(scene, 'Player')
    player.addComponent(Player, models.fox, keyboardInputManager)

    const ground = gameObjectManager.createGameObject(scene, 'Ground')
    ground.addComponent(Ground, 1000, 1000)
    console.log(player)
    console.log(ground)

    // playNextAction(fox.mixerInfo)
    // playNextAction(fox.mixerInfo)
    update();
}



const update = function () {
    requestAnimationFrame(update);

    const delta = clock.getDelta()
    
    // if (fox) fox.mixerInfo.mixer.update(delta)

    gameObjectManager.update(delta)

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
  // Clock
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
  mouseControls = new MouseControlManager(scene, camera)
  keyboardInputManager = new KeyboardInputManager()

  // GameObjectManager
  gameObjectManager = new GameObjectManager() 

  window.onresize = () => { resizeScreen(renderer)}
}

function resizeScreen(renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

window.onload = function () {
    loadModels(init)
}
