import { AppContext } from "./types";

export const setupResizer = ({ renderer, composer }: AppContext) => {
  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };

  onResize();

  window.addEventListener("resize", onResize);
};
