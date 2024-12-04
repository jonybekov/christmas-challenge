import * as THREE from "three";
import { AppContext } from "./types";

export const setupLights = ({ scene, gui }: AppContext) => {
  const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
  const directionalLight = new THREE.DirectionalLight("#fff", 1.5);
  const helper = new THREE.DirectionalLightHelper(directionalLight, 2);

  directionalLight.position.set(5, 5, 0);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.top = 8;
  directionalLight.shadow.camera.right = 8;
  directionalLight.shadow.camera.bottom = -8;
  directionalLight.shadow.camera.left = -8;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;

  scene.add(helper);
  scene.add(directionalLight);
  scene.add(ambientLight);

  gui
    .add(directionalLight.position, "x")
    .min(1)
    .max(100)
    .name("Directional Light (x)");

  return { ambientLight, directionalLight };
};
