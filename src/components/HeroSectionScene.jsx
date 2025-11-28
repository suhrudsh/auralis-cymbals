import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import { useTrailTexture } from "../hooks/useTrailTexture";
import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import planeVertexShader from "../shaders/planeVertexShader.glsl";
import planeFragmentShader from "../shaders/planeFragmentShader.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import {
  LinearSRGBColorSpace,
  MeshStandardMaterial,
  SRGBColorSpace,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

export function HeroSectionScene({ props, visible }) {
  const { nodes, materials } = useGLTF(
    `${import.meta.env.BASE_URL}auralis-cymbals-hero-section.glb`,
  );

  // Trail texture & mouse
  const { size } = useThree();
  const {
    texture: trailTexture,
    updatePointer,
    clearPointer,
  } = useTrailTexture({ size, visible });

  useEffect(() => {
    window.addEventListener("mousemove", updatePointer);
    window.addEventListener("mouseleave", clearPointer);
    window.addEventListener("touchmove", updatePointer, { passive: true });
    window.addEventListener("touchend", clearPointer, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updatePointer);
      window.removeEventListener("mouseleave", clearPointer);
      window.removeEventListener("touchmove", updatePointer);
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
    if (!visible) return;
    planeUniforms.uTime.value = clock.elapsedTime;
  });

  const planeTextures = useTexture({
    map: "auralis-cymbals-hero-section-plane-basecolor.webp",
    roughnessMap: "auralis-cymbals-hero-section-plane-roughness.webp",
    normalMap: "auralis-cymbals-hero-section-plane-normal.webp",
  });

  const planeMaterial = useMemo(
    () =>
      new CustomShaderMaterial({
        baseMaterial: MeshStandardMaterial,
        uniforms: planeUniforms,
        vertexShader: planeVertexShader,
        fragmentShader: planeFragmentShader,
        transparent: false,
        ...planeTextures,
        metalness: 1,
      }),
    [planeUniforms, planeTextures],
  );

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

  const cymbalMaterial = useMemo(
    () =>
      new CustomShaderMaterial({
        baseMaterial: MeshStandardMaterial,
        uniforms: shaderUniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        color: materials.cymbals.color,
        roughness: materials.cymbals.roughness,
        metalness: materials.cymbals.metalness,
        map: cymbalTextures.map,
        normalMap: materials.cymbals.normalMap,
        roughnessMap: materials.cymbals.roughnessMap,
        normalScale: materials.cymbals.normalScale,
      }),
    [
      cymbalTextures.map,
      materials.cymbals.color,
      materials.cymbals.roughness,
      materials.cymbals.metalness,
      materials.cymbals.normalMap,
      materials.cymbals.roughnessMap,
      materials.cymbals.normalScale,
      shaderUniforms,
    ],
  );

  planeTextures.map.colorSpace = SRGBColorSpace;
  planeTextures.roughnessMap.colorSpace = LinearSRGBColorSpace;
  planeTextures.normalMap.colorSpace = LinearSRGBColorSpace;

  // CYMBAL TEXTURE
  cymbalTextures.map.colorSpace = SRGBColorSpace;

  // SHADOW BAKE
  shadowMap.colorSpace = SRGBColorSpace;

  return (
    <>
      <group {...props} dispose={null}>
        {/* Plane with shadow bake and trail mask */}
        <mesh geometry={nodes.Plane.geometry} material={planeMaterial} />

        {/* Other meshes with custom shader */}
        {cymbals.map((cymbal, i) => (
          <mesh
            key={i}
            geometry={cymbal.geometry}
            position={cymbal.position}
            rotation={cymbal.rotation}
            material={cymbalMaterial}
          />
        ))}
      </group>
    </>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}auralis-cymbals-hero-section.glb`);
