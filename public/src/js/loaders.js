
import * as THREE from '../dependencies/three.module.js'

const loader = new THREE.ObjectLoader();


export const loadTree = (scene) => {
    loader.load(
        "../models/tree.json",

        function (obj) {
            // Add the loaded object to the scene
            scene.add(obj);
        },

        // onProgress callback
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // onError callback
        function (err) {
            console.error('An error happened');
        }
    )
}
