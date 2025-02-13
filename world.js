let groundTiles = {};
let housePositions = [];
let tileSize = 20;

export function createGroundTile(x, z, scene) {
    let key = `${x},${z}`;
    if (!groundTiles[key]) {
        let ground = BABYLON.MeshBuilder.CreateGround(`ground-${x}-${z}`, { width: tileSize, height: tileSize }, scene);
        ground.position.x = x * tileSize;
        ground.position.z = z * tileSize;
        groundTiles[key] = ground;

        if (Math.random() > 0.7) {
            housePositions.push({ x: ground.position.x, z: ground.position.z });
        }
    }
}

export function checkForNewTiles(camera, scene) {
    let playerX = Math.floor(camera.position.x / tileSize);
    let playerZ = Math.floor(camera.position.z / tileSize);

    for (let x = playerX - 1; x <= playerX + 1; x++) {
        for (let z = playerZ - 1; z <= playerZ + 1; z++) {
            createGroundTile(x, z, scene);
        }
    }

    addHouses(scene);
}

export function addHouses(scene) {
    housePositions.forEach(pos => {
        if (!scene.getMeshByName(`house-${pos.x}-${pos.z}`)) {
            let house = BABYLON.MeshBuilder.CreateBox(`house-${pos.x}-${pos.z}`, { width: 4, height: 3, depth: 4 }, scene);
            house.position.set(pos.x, 1.5, pos.z);
            house.material = new BABYLON.StandardMaterial("houseMat", scene);
            house.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        }
    });
}
