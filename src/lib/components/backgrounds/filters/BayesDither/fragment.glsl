uniform sampler2D tDiffuse;
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;

float bayerDither(vec2 pos) {
    int x = int(mod(pos.x, 4.0));
    int y = int(mod(pos.y, 4.0));
    int idx = x + y * 4;
    float m[16] = float[16](
        0.0, 8.0, 2.0, 10.0,
        12.0, 4.0, 14.0, 6.0,
        3.0, 11.0, 1.0, 9.0,
        15.0, 7.0, 13.0, 5.0
    );
    return m[idx] / 16.0;
}

void main() {
    vec4 originalColor = texture2D(tDiffuse, vUv);
    
    vec2 pos = gl_FragCoord.xy;
    vec2 bayesPos = pos * 0.2 + u_mouse * 10.0 + u_time * 3.0;
    float threshold = bayerDither(bayesPos);

    float brightness = (originalColor.r + originalColor.g + originalColor.b) / 3.0;
    
    float mouseControl = (u_mouse.x+u_mouse.y)* 0.5 + 0.20;
    
    if (brightness * mouseControl > threshold) {
        gl_FragColor = originalColor;
    } else {
        gl_FragColor = vec4(0.0);
    }

}