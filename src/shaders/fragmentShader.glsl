varying float vMask;
varying vec2 vUv;

void main() {
  vec4 baseColor = texture2D(map, vUv);

  float extraLighteningFactor = 3.0;

  vec4 lightenedColor = baseColor * extraLighteningFactor;

  csm_DiffuseColor.rgb = lightenedColor.rgb;

  csm_DiffuseColor.a = vMask;

}
