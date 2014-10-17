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

        var scene = new BABYLON.Scene(engine);

        // Setup camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
        camera.attachControl(canvas);

        // Lights
        var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
        var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, -10, 0), scene);
        var light2 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(10, 0, 0), scene);
        var light3 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);

        var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 3, scene);

        // Creating light sphere
        var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
        var lightSphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 16, 0.5, scene);
        var lightSphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 16, 0.5, scene);

        // Lights colors
        light0.diffuse = new BABYLON.Color3(1, 0, 0);
        light0.specular = new BABYLON.Color3(1, 0, 0);

        light1.diffuse = new BABYLON.Color3(0, 1, 0);
        light1.specular = new BABYLON.Color3(0, 1, 0);

        light2.diffuse = new BABYLON.Color3(0, 0, 1);
        light2.specular = new BABYLON.Color3(0, 0, 1);

        light3.diffuse = new BABYLON.Color3(1, 1, 1);
        light3.specular = new BABYLON.Color3(1, 1, 1);

        var alpha = 0;

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            // Animations
            light0.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, 10 * Math.cos(alpha));
            light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, -10 * Math.cos(alpha));
            light2.position = new BABYLON.Vector3(10 * Math.cos(alpha), 0, 10 * Math.sin(alpha));

            lightSphere0.position = light0.position;
            lightSphere1.position = light1.position;
            lightSphere2.position = light2.position;

            alpha += 0.01;

            scene.render();
        });
    }
}