import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { AppContext } from "./types";
import * as THREE from "three";

/**
 * "Snow Mountain" (https://skfb.ly/6GxY7) by nigromancer is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
 */

export const addTrees = ({ scene }: AppContext) => {
  const gltfLoader = new GLTFLoader();

  gltfLoader.load("/models/low-poly_snow_tree/scene.gltf", (gltf) => {
    // gltf.scene.scale.setScalar(0.4);

    for (let i = 0; i < 100; i++) {
      const tree = gltf.scene.clone();

      tree.scale.setScalar(Math.random() * 2 + 1.5);
      tree.position.x = (Math.random() - 0.5) * 100;
      tree.position.z = (Math.random() - 0.5) * 100;
      scene.add(tree);
    }
  });
};
