#ifdef GL_ES
precision mediump float;
#endif

// Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;

// Parameters
uniform vec3 mask;

void main(void) 
{
	vec3 source = texture2D(textureSampler, vUV).rgb;

	gl_FragColor = vec4(source * mask, 1.0);
}