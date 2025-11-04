import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

//TODO: Adjust light intensities and positions to match Blender scene as closely as possible

export function Lights() {
  const dirLight1 = useRef();
  const dirLight2 = useRef();
  const dirLight3 = useRef();
  const dirLight4 = useRef();

  useHelper(dirLight1, DirectionalLightHelper, 5, "red");
  useHelper(dirLight2, DirectionalLightHelper, 5, "green");
  useHelper(dirLight3, DirectionalLightHelper, 5, "blue");
  useHelper(dirLight4, DirectionalLightHelper, 5, "yellow");

  return (
    <>
      {/* Area Light 1 as Directional - Blender: (-20, 20, 53.22) */}
      <directionalLight
        ref={dirLight1}
        position={[-20, 53.22, -20]}
        intensity={10}
        color="#ffffff"
      />

      {/* Area Light 2 as Directional - Blender: (17, 30, 43.58) */}
      <directionalLight
        ref={dirLight2}
        position={[17, 43.58, -30]}
        intensity={10}
        color="#ffffff"
      />

      {/* Area Light 3 as Directional - Blender: (-30.56, -15.84, 53.22) */}
      <directionalLight
        ref={dirLight3}
        position={[-30.56, 53.22, 15.84]}
        intensity={10}
        color="#ffffff"
      />

      {/* Sun Light - Blender: (40, -30, 38.49) */}
      <directionalLight
        ref={dirLight4}
        position={[40, 38.49, 30]}
        intensity={1.75}
        color="#ffffff"
      />
    </>
  );
}
