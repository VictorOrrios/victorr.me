uniform sampler2D tDiffuse;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vUv;


void main() {
    float pixel_size = 8.0 + u_mouse.y*5.0 ;
    vec2 uvScreen = vUv * u_resolution;
    vec2 center = floor(uvScreen / pixel_size) * pixel_size + pixel_size/2.0;
    float sample_radius = pixel_size/4.0;
    vec2 uvScreenSample = vec2(center.x - cos(u_time) * sample_radius,
                               center.y - sin(u_time) * sample_radius);
    float d_from_center = length(center-uvScreen);
    vec2 uvPixelated = uvScreenSample / u_resolution;

    float max_distance = pixel_size/(1.5 + u_mouse.x*2.5);
    vec4 originalColor = texture2D(tDiffuse, uvPixelated);
    if(d_from_center > max_distance){
        originalColor = originalColor * (1.0 - (d_from_center - max_distance));
    }
    originalColor.a = 1.0;
    gl_FragColor = originalColor;
}