// import * as THREE from '../dependencies/three.module.js'
import { BoxGeometry, MeshPhongMaterial, Mesh } from '../dependencies/three.module.js'

export function createCube(x, y) {
    const geometry = new BoxGeometry();
    const material = new MeshPhongMaterial({
        // light
        specular: 0xD76531,
        // intermediate
        color: 0xef8834,
        // dark
        emissive: 0x8c2317,
        shininess: 50,
        wireframe: false,
    });
    const cube = new Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = y;
    return cube
}