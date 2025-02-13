import { createGroundTile, checkForNewTiles, addHouses } from "./world.js";
import { startMission } from "./missions.js";

// Skapa spelmotor och scen
const canvas = document.getElementById("gameCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Skapa kamera & ljus
const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 2, -10), scene);
camera.attachControl(canvas, true);
camera.speed = 0.2;
const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Starta världen
createGroundTile(0, 0, scene);
checkForNewTiles(camera, scene);
addHouses(scene);

// Spel-loop
engine.runRenderLoop(() => {
    checkForNewTiles(camera, scene);
    scene.render();
});

// Kollision med hus → Starta uppdrag
scene.onPointerObservable.add((event) => {
    if (event.pickInfo.hit && event.pickInfo.pickedMesh.name.includes("house")) {
        startMission();
    }
}, BABYLON.PointerEventTypes.POINTERPICK);
