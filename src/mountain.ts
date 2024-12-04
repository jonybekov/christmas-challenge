import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { AppContext } from "./types";
/**
 * "Snow Mountain" (https://skfb.ly/6GxY7) by nigromancer is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
 */

export const addMountain = ({ scene }: AppContext) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load("/models/snow_mountain/scene.gltf", (gltf) => {
    gltf.scene.scale.setScalar(5);
    gltf.scene.position.set(100, -0.01, 0);
    scene.add(gltf.scene);
  });
};
