import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import { useTrailTexture } from "../hooks/useTrailTexture";
import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import planeVertexShader from "../shaders/planeVertexShader.glsl";
import planeFragmentShader from "../shaders/planeFragmentShader.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";

export function HeroSectionScene(props) {
  const { nodes, materials } = useGLTF(
    `${import.meta.env.BASE_URL}auralis-cymbals-hero-section.glb`,
  );

  // Trail texture & mouse
  const { size } = useThree();
  const {
    texture: trailTexture,
    updatePointer,
    clearPointer,
  } = useTrailTexture({ size });

  useEffect(() => {
    const handlePointer = (e) => {
      updatePointer(e);
    };

    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("mouseleave", clearPointer);
    window.addEventListener("touchmove", handlePointer, { passive: true });
    window.addEventListener("touchend", clearPointer, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("mouseleave", clearPointer);
      window.removeEventListener("touchmove", handlePointer);
      window.removeEventListener("touchend", clearPointer);
    };
  }, [size, updatePointer, clearPointer]);

  // Load baked shadow texture
  const shadowMap = useTexture(
    "auralis-cymbals-hero-section-plane-shadow-map.webp",
  );

  // Shader uniforms for plane
  const planeUniforms = useMemo(
    () => ({
      uTrailTexture: { value: trailTexture },
      uShadowTexture: { value: shadowMap },
      uTime: { value: 0 },
    }),
    [trailTexture, shadowMap],
  );

  useFrame(({ clock }) => {
    planeUniforms.uTime.value = clock.elapsedTime;
  });

  const planeTextures = useTexture({
    map: "auralis-cymbals-hero-section-plane-basecolor.webp",
    roughnessMap: "auralis-cymbals-hero-section-plane-roughness.webp",
    normalMap: "auralis-cymbals-hero-section-plane-normal.webp",
  });

  const cymbalTextures = useTexture({
    map: "cymbal-diffuse.webp",
  });

  // Shader uniforms for other meshes
  const shaderUniforms = useMemo(
    () => ({
      uTrailTexture: { value: trailTexture },
      uExtrusionAmount: { value: 0.05 },
    }),
    [trailTexture],
  );

  const cymbals = Object.values(nodes).filter((obj) =>
    obj.name.toLowerCase().startsWith("cymbal"),
  );

  return (
    <>
      <group {...props} dispose={null}>
        {/* Plane with shadow bake and trail mask */}
        <mesh geometry={nodes.Plane.geometry}>
          <CustomShaderMaterial
            baseMaterial={MeshStandardMaterial}
            uniforms={planeUniforms}
            vertexShader={planeVertexShader}
            fragmentShader={planeFragmentShader}
            {...planeTextures}
            metalness={1}
          />
        </mesh>

        {/* Other meshes with custom shader */}
        {cymbals.map((cymbal, i) => (
          <mesh
            key={i}
            geometry={cymbal.geometry}
            position={cymbal.position}
            rotation={cymbal.rotation}
          >
            <CustomShaderMaterial
              baseMaterial={MeshStandardMaterial}
              uniforms={shaderUniforms}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              transparent={true}
              color={materials.cymbals.color}
              roughness={materials.cymbals.roughness}
              metalness={materials.cymbals.metalness}
              map={cymbalTextures.map}
              normalMap={materials.cymbals.normalMap}
              roughnessMap={materials.cymbals.roughnessMap}
              normalScale={materials.cymbals.normalScale}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}auralis-cymbals-hero-section.glb`);
