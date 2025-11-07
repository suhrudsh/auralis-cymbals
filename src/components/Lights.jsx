// import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import {
  // RectAreaLightHelper,
  RectAreaLightUniformsLib,
} from "three/examples/jsm/Addons.js";

export function Lights() {
  const areaLight1 = useRef();
  const areaLight2 = useRef();
  const areaLight3 = useRef();
  const dirLight = useRef();

  const { scene } = useThree();

  useEffect(() => {
    RectAreaLightUniformsLib.init();
  }, [scene]);

  // useHelper(areaLight1, RectAreaLightHelper, "red");
  // useHelper(areaLight2, RectAreaLightHelper, "green");
  // useHelper(areaLight3, RectAreaLightHelper, "blue");
  // useHelper(dirLight, DirectionalLightHelper, "yellow");

  useEffect(() => {
    if (areaLight1.current) {
      areaLight1.current.lookAt(-19.007, 0, -20.258);
    }

    if (areaLight2.current) {
      areaLight2.current.lookAt(16.801, 0, -29.71);
    }

    if (areaLight3.current) {
      areaLight3.current.lookAt(-29.786, 0, 15.529);
    }

    if (dirLight.current) {
      const targetPos = new Vector3(40, 38.49, 30).add(
        new Vector3(-0.631, -0.612, -0.477).multiplyScalar(10),
      );
      dirLight.current.target.position.copy(targetPos);
      dirLight.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Area Light 1 */}
      <rectAreaLight
        ref={areaLight1}
        position={[-45, 53, -25]}
        intensity={5}
        color="#ffffff"
        width={35}
        height={35}
      />

      {/* Area Light 2 */}
      <rectAreaLight
        ref={areaLight2}
        position={[40, 53, -30]}
        intensity={5}
        color="#ffffff"
        width={35}
        height={35}
      />

      {/* Area Light 3 */}
      <rectAreaLight
        ref={areaLight3}
        position={[-45, 53, 25]}
        intensity={5}
        color="#ffffff"
        width={35}
        height={35}
      />

      {/* Sun Light */}
      <directionalLight
        ref={dirLight}
        position={[40, 38.49, 30]}
        intensity={1.75}
        color="#ffffff"
      />
    </>
  );
}
