/// <reference path="/scripts/babylon.js" />

"use strict";

var canvas;
var engine;
var scene;

document.addEventListener("DOMContentLoaded", startBabylonJS, false);

function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            engine.clear(new BABYLON.Color3(0.2, 0.2, 0.3), true);
        });
    }
}