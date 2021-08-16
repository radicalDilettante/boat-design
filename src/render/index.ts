import * as THREE from "three";

export default class Render {
  //import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  //import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
  //import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const fov = 75; //filed of view
    const aspect = 2; //default ratio
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new THREE.Scene();

    //add light
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    //geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    //const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    //make a material for shiny surfaces with specular highlights.
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    function render(time: number) {
      time *= 0.001; // convert time to seconds

      cube.rotation.x = time;
      cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
}
