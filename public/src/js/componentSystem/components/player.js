import * as THREE from '../../../dependencies/three.module.js'

import Component from './component.js'
import SkinInstance from './skinInstance.js'

export default class Player extends Component {
  constructor(gameObject, model, keyboardInputManager) {
    super(gameObject);

    model.gltf.scene.scale.set(model.scale.x, model.scale.y, model.scale.z)

    this.skinInstance = gameObject.addComponent(SkinInstance, model);
    this.skinInstance.setAnimation('Run')

    this.keyboardInputManager = keyboardInputManager

    this.moveSpeed = 20
    this.turnSpeed = this.moveSpeed / 4;
    this.forward = new THREE.Vector3(0, 0, 1)
    console.log("Transform", gameObject.transform.translateOnAxis)
  }

  update(deltaTime) {
    // const {transform} = this.gameObject
    // // console.log(this.keyboardInputManager)
    
    const {left, right} = this.keyboardInputManager.keys
    // console.log('left, right :>> ', left, right)
    
    const delta = (left.down  ?  1 : 0) +
                  (right.down ? -1 : 0)
    // this.gameObject.transform.rotation.y += 0.001 // this.turnSpeed * delta * deltaTime
    // this.gameObject.transform.translateOnAxis(this.)
    this.gameObject.transform.rotation.y += this.turnSpeed * delta * deltaTime;
    this.gameObject.transform.translateOnAxis(this.forward, this.moveSpeed * deltaTime)
  }
}