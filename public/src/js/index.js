import * as THREE from '../dependencies/three.module.js'

import { loadTree } from './loaders.js'

console.log("hej")
function App() {

    let scene, camera, renderer, mixer, loader, clock
    const cubes = []


    function init() {
        // Scene setup
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x222222)

        // Camera setup
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // var light = new THREE.PointLight(0xff0000, 1, 100);
        // light.position.set(0, 50, 0);
        // scene.add(light);
        var light = new THREE.DirectionalLight(0xfdfdfd, 2);
        // you set the position of the light and it shines into the origin
        light.position.set(2, 2, 1).normalize();
        scene.add(light);

        const rows = 20
        const cols = 30

        loadTree(scene)

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                var geometry = new THREE.BoxGeometry();
                // var material = new THREE.MeshBasicMaterial({ color: 0xf0ff0f });
                var material = new THREE.MeshPhongMaterial({
                    // light
                    specular: 0xD76531,
                    // intermediate
                    color: 0xef8834,
                    // dark
                    emissive: 0x8c2317,
                    shininess: 50,
                    wireframe: false,
                });
                var cube = new THREE.Mesh(geometry, material);
                cube.position.x = -cols + i * 2;
                cube.position.y = -rows + j * 2;
                cube.position
                cubes.push(cube)
                scene.add(cube);
            }
        }

        camera.position.z = 20;

        var animate = function () {
            requestAnimationFrame(animate);
            cubes.forEach(cube => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                // camera.position.z += 0.000003
            })

            renderer.render(scene, camera);
        };
        animate();


    }
    init()
}

window.onload = function () {
    App()
}
