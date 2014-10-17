/// <reference path="/scripts/babylon.js" />

"use strict";

var canvas;
var engine;
var scene;
var camera;
var mesh;
var light;

document.addEventListener("DOMContentLoaded", startBabylonJS, false);

function startBabylonJS() {
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);

        scene = new BABYLON.Scene(engine);
        //camera = new BABYLON.FreeCamera("myFirstCam", new BABYLON.Vector3(0, 2, -10), scene);
        //camera.attachControl(canvas);
        //camera.checkCollisions = true;
        //camera.applyGravity = true;

        var arcCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
        arcCamera.attachControl(canvas);

        var ground = new BABYLON.Mesh.CreateGround("ground", 32, 32, 12, scene);
        ground.checkCollisions = true;

        light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light = new BABYLON.PointLight("pointlight", new BABYLON.Vector3(5, 10, -5), scene);
        light.diffuse = new BABYLON.Color3.Purple();

        var cube = new BABYLON.Mesh.CreateBox("box", 2, scene);
        cube.position = new BABYLON.Vector3(0, 2, 0);
        cube.checkCollisions = true;

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            cube.rotation.y += 0.01;
            cube.rotation.x += 0.01;
            scene.render();
        });
    }
}
