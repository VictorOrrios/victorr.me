uniform sampler2D tDiffuse;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vUv;


void main() {
    float pixel_size = 4.0;
    vec2 uvScreen = vUv * u_resolution;
    uvScreen = floor(uvScreen / pixel_size) * pixel_size;
    vec2 uvPixelated = uvScreen / u_resolution;

    vec4 originalColor = texture2D(tDiffuse, uvPixelated);
    gl_FragColor = originalColor;
}