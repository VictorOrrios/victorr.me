uniform sampler2D tDiffuse;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 vUv;



void main() {
    float column_size = mix(10.0,30.0,u_mouse.y);
    float force = 3.0;
    float pi = 3.141592;
    float saturation = column_size*0.8;

    vec2 uvScreen = vUv * u_resolution;
    vec2 modUv = uvScreen;
    float ratio = u_mouse.x;
    float angle = mod(mix(uvScreen.x,uvScreen.y,ratio),column_size);
    float offset = tan(angle*pi/column_size+1.6)*force;
    offset = max(-saturation,min(saturation,offset));
    modUv.x += mix(0.0,offset,ratio)+sin(u_time)*5.0;;
    modUv.y += mix(offset,0.0,ratio)+cos(u_time+0.5)*5.0;;

    vec4 originalColor = texture2D(tDiffuse, modUv/u_resolution);
    gl_FragColor = originalColor*mix(1.0,1.5,abs(offset/saturation));
}