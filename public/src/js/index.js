import * as THREE from '../dependencies/three.module.js'
import { GLTFLoader } from '../dependencies/GLTFLoader.js'

import { loadModels, prepModelsAndAnimations } from './loaders.js'
import { spawnModel } from './spawners.js'
import { createCube } from './cube.js'
import mouseControls from './controls/mouseControls.js'

const loadingElem = document.querySelector('#loading')

let scene, camera, renderer, clock, controls
const cubes  = []
const rows = 20
const cols = 30
let fox


function init() {
    
    loadingElem.style.display = 'none'
    setUp()
    controls = mouseControls(scene, camera)
    // loadFox()
    const models = prepModelsAndAnimations()
    fox = spawnModel(scene, models["fox"], 0, -20, 0)
    playNextAction(fox.mixerInfo)
    // playNextAction(fox.mixerInfo)

    console.log('models :>> ', models)

    // for (let i = 0; i < cols; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         const cube = createCube(-cols + i * 2, -rows + j * 2)
    //         cubes.push(cube)
    //         scene.add(cube);
    //     }
    // }
    update();
}



const update = function () {
    requestAnimationFrame(update);

    const delta = clock.getDelta()
    
    fox.mixerInfo.mixer.update(delta)

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // cubes.forEach(cube => {
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    //     // camera.position.z += 0.000003
    // })

    // camera.position.z += 0.04
    

    renderer.render(scene, camera);
};

function playAnimationByName(name) {

}

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
// Scene setup
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x222222)

    // Camera setup
    const fov = 45
    const aspect = 2  // the canvas default
    const near = 0.1
    const far = 100
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 20, 40);

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    // var light = new THREE.PointLight(0xff0000, 1, 100)
    // light.position.set(0, 50, 0)
    // scene.add(light)
    var light = new THREE.DirectionalLight(0xfdfdfd, 2)
    // you set the position of the light and it shines into the origin
    light.position.set(2, 2, 1).normalize()
    scene.add(light)
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    
    if (needResize) {
      renderer.setSize(width, height, false)
      console.log("Resized")
    }
    return needResize
  }


window.onload = function () {
    loadModels(init)
}
