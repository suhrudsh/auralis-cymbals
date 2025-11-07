// trailFragmentShader.glsl
#include "../../node_modules/lygia/generative/cnoise.glsl"

uniform vec2 uMouse;
uniform float uFade;
uniform float uAspect;
uniform float uTime;
uniform sampler2D uPreviousFrame;

varying vec2 vUv;

void main() {
  // 1. Sample and fade
  vec4 previousColor = texture2D(uPreviousFrame, vUv);
  vec4 fadedColor = previousColor - uFade;

  // 2. Scaled coordinates for proper aspect
  vec2 centeredUv = vUv - 0.5;
  vec2 scaledUv = vec2(centeredUv.x * uAspect, centeredUv.y);

  vec2 centeredMouse = uMouse - 0.5;
  vec2 scaledMouse = vec2(centeredMouse.x * uAspect, centeredMouse.y);

  // 3. Base distance
  float dist = distance(scaledUv, scaledMouse);

  float noiseScale = 6.0;
  float noiseStrength = 0.15;

  // 4. Procedural noise
  // You can feed in scaled coordinates and time to make it move
  float n = cnoise(vec3(vUv * noiseScale, uTime * 0.2));

  // 5. Use noise to perturb the distance
  dist += n * noiseStrength;

  // 6. Soft circular mask
  float radius = 0.3;
  float newDot = 1.0 - smoothstep(0.0, radius, dist);

  // 7. Combine and output
  float finalMask = max(fadedColor.r, newDot);
  gl_FragColor = vec4(vec3(finalMask), 1.0);
}
