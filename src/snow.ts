import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial,
  TextureLoader,
} from "three";
import { AppContext } from "./types";

const loader = new TextureLoader();

export const addSnowParticles = ({ scene }: AppContext) => {
  const particlesCount = 10000;
  const particlesArray = new Float32Array(particlesCount * 3);
  const velositiesArray = new Float32Array(particlesCount * 3);
  const bufferGeometry = new BufferGeometry();

  const maxRange = 100;
  const minRange = maxRange / 2;
  const maxHeight = 10;
  const minHeight = maxHeight / 2;

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;

    particlesArray[i3] = (Math.random() - 0.5) * 100;
    particlesArray[i3 + 1] = Math.random() * maxHeight + minHeight;
    particlesArray[i3 + 2] = (Math.random() - 0.5) * 100;

    velositiesArray[i3] = (Math.random() * 6 - 3) * 0.1 * 0.01;
    velositiesArray[i3 + 1] = (Math.random() * 5 + 0.12) * 0.18 * 0.01;
    velositiesArray[i3 + 2] = (Math.random() * 6 - 3) * 0.1 * 0.01;
  }

  const texture = loader.load("/sprites/snowflake2.png");

  const material = new PointsMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    opacity: 0.7,
    size: 1,
    sizeAttenuation: true,
  });
  const particles = new Points(bufferGeometry, material);

  bufferGeometry.setAttribute(
    "position",
    new BufferAttribute(particlesArray, 3)
  );
  bufferGeometry.setAttribute(
    "velocity",
    new BufferAttribute(velositiesArray, 3)
  );

  scene.add(particles);

  const animate = (elapsedTime: number) => {
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      particles.geometry.attributes.position.array[i3] -=
        particles.geometry.attributes.velocity.array[i3 + 0];

      particles.geometry.attributes.position.array[i3 + 1] -=
        particles.geometry.attributes.velocity.array[i3 + 1];

      particles.geometry.attributes.position.array[i3 + 2] -=
        particles.geometry.attributes.velocity.array[i3 + 2];

      if (particles.geometry.attributes.position.array[i3 + 1] < 0) {
        particles.geometry.attributes.position.array[i3] = Math.floor(
          Math.random() * maxRange - minRange
        );

        particles.geometry.attributes.position.array[i3 + 1] = Math.floor(
          Math.random() * maxRange + minHeight
        );

        particles.geometry.attributes.position.array[i3 + 2] = Math.floor(
          Math.random() * maxRange - minRange
        );
      }
    }

    particles.geometry.attributes.position.needsUpdate = true;
  };

  return { animate };
};
