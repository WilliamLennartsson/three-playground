
import Component from './component.js'
import SkinInstance from './skinInstance.js'
import * as THREE from '../../../dependencies/three.module.js'

export default class Player extends Component {
  constructor(gameObject, model, keyboardInputManager) {
    super(gameObject);

    this.skinInstance = gameObject.addComponent(SkinInstance, model);
    this.skinInstance.setAnimation('Survey')

    this.keyboardInputManager = keyboardInputManager
    console.log(this.keyboardInputManager)

    this.moveSpeed = 3
    this.turnSpeed = this.moveSpeed / 4;
    this.forward = new THREE.Vector3(0, 0, 1)

  }

  update(deltaTime) {
    // const {transform} = this.gameObject
    // // console.log(this.keyboardInputManager)
    
    // const {left, right} = this.keyboardInputManager.keys
    // // console.log('left, right :>> ', left, right)
    
    // const delta = (left.down  ?  1 : 0) +
    //               (right.down ? -1 : 0)
    
    this.gameObject.transform.rotation.y += 0.001 // this.turnSpeed * delta * deltaTime
    //this.gameObject.transform.translateOnAxis(this.kForward, this.moveSpeed * deltaTime)
  }
}