// planeVertexShader.glsl

#include "../../node_modules/lygia/generative/gerstnerWave.glsl"
#include "../../node_modules/lygia/generative/cnoise.glsl"

attribute vec2 uv1;

varying vec2 vUv;
varying vec2 vShadowUv;
// Change vMask to a vec4 to pass the clip space position
varying vec4 vClipPosition;

uniform sampler2D uTrailTexture;
uniform float uTime;

void main() {
  vUv = uv1;
  vShadowUv = vec2(uv1.x, 1.0 - uv1.y);

  vec3 wave = gerstnerWave(uv1, vec2(1.0, 1.0), 15.0, 0.15, uTime / 10.0);

  float noise = cnoise(vec3(uv1 * 4.0, uTime / 10.0));
  float noiseStrength = 0.9; // tweak for subtle or heavy distortion

  // Calculate the final position
  vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Pass the raw clip position (before division) to the fragment shader
  vClipPosition = clipPos;

  vec2 screenUV = vClipPosition.xy / vClipPosition.w * 0.5 + 0.5;
  float trailMask = texture2D(uTrailTexture, screenUV).r;

  vec3 newPosition = position + wave + noise * noiseStrength - trailMask * 0.15;

  // gl_Position = clipPos;
  csm_Position = newPosition;
}
