import * as THREE from '../dependencies/three.module.js'
import {SkeletonUtils} from '../dependencies/SkeletonUtils.js'


export function spawnModel(scene, model, x, y, z) {
    const clonedScene = SkeletonUtils.clone(model.gltf.scene)
    const root = new THREE.Object3D()
    root.add(clonedScene)
    scene.add(root)
    root.position.x = x
    root.position.y = y
    root.position.z = z

    const mixer = new THREE.AnimationMixer(clonedScene)
    const actions = Object.values(model.animations).map((clip) => {
        return mixer.clipAction(clip)
    })
    const mixerInfo = {
        mixer,
        actions,
        actionNdx: -1,
    }
    model.mixerInfo = mixerInfo

    return model
}

export function spawnPlane(scene, x, y, z, width, height) {
    
}