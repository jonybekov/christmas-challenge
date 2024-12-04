import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";
import { setupLights } from "./lights";
import { setupResizer } from "./resizer";
import {
  EffectComposer,
  GLTFLoader,
  OutputPass,
  RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";
import { addMountain } from "./mountain";
import { addTrees } from "./trees";
import { addSnowParticles } from "./snow";

const sizes = { width: window.innerWidth, height: innerHeight };

const setup = () => {
  const gui = new GUI();
  const scene = new THREE.Scene();
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   sizes.width / sizes.height,
  //   0.1,
  //   1000
  // );

  const aspect = window.innerWidth / window.innerHeight;
  const d = 10;
  const camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  // controls.enableRotate = false;

  camera.position.setScalar(d);
  camera.lookAt(scene.position);

  gui
    .add(camera, "left")
    .min(0.1)
    .max(2000)
    .onChange(() => {
      camera.updateProjectionMatrix();
    });
  gui
    .add(camera, "right")
    .min(0.1)
    .max(2000)
    .onChange(() => {
      camera.updateProjectionMatrix();
    });
  gui
    .add(camera, "top")
    .min(0.1)
    .max(2000)
    .onChange(() => {
      camera.updateProjectionMatrix();
    });
  gui
    .add(camera, "near")
    .min(0.1)
    .max(2000)
    .onChange(() => {
      camera.updateProjectionMatrix();
    });
  gui
    .add(camera, "far")
    .min(0.1)
    .max(2000)
    .onChange(() => {
      camera.updateProjectionMatrix();
    });

  document.body.appendChild(renderer.domElement);
  renderer.setPixelRatio(Math.max(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const composer = new EffectComposer(renderer);
  const renderPixelatedPass = new RenderPixelatedPass(6, scene, camera);
  composer.addPass(renderPixelatedPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  return { scene, renderer, camera, controls, gui, composer };
};

const appContext = setup();
const { renderer, scene, camera, composer, controls } = appContext;

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1),
  new THREE.MeshStandardMaterial({ color: "red" })
);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: "white" })
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
mesh.castShadow = true;
mesh.position.y = 0.5;

scene.add(mesh);
scene.add(ground);

setupLights(appContext);
setupResizer(appContext);

addMountain(appContext);
addTrees(appContext);
const { animate } = addSnowParticles(appContext);

const clock = new THREE.Clock();

const update = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  animate(elapsedTime);
  composer.render();
  // renderer.render(scene, camera);
};

renderer.setAnimationLoop(update);
