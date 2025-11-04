// planeVertexShader.glsl

attribute vec2 uv1;

varying vec2 vUv;
varying vec2 vShadowUv;
// Change vMask to a vec4 to pass the clip space position
varying vec4 vClipPosition;

void main() {
  vUv = uv1;
  vShadowUv = vec2(uv1.x, 1.0 - uv1.y);

  // Calculate the final position
  vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Pass the raw clip position (before division) to the fragment shader
  vClipPosition = clipPos;

  gl_Position = clipPos;
}
