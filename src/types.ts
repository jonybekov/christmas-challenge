import { GUI } from "lil-gui";
import * as THREE from "three";

export type AppContext = {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  controls: THREE.Controls<{}>;
  gui: GUI;
};
