// ########################################
// Step 0 - Get DOM objects
// ########################################
var canvas = document.getElementById("renderCanvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// ########################################
// Step 1 - Init WebGL
// ########################################
var gl = canvas.getContext("experimental-webgl");


// ########################################
// Step 2 - Render
// ########################################
function renderLoop() {
    gl.clearColor(1.0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Register for the next frame
    requestAnimationFrame(renderLoop);
}

// ########################################
// Final step - Let's go!
// ########################################
requestAnimationFrame(renderLoop);