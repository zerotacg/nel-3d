import THREE from "three";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
};

render();

import CSceneUser from "nel/3d/scene/c_scene_user";
import ZFunction from "nel/3d/material/z_function";
import CRGBA from "nel/misc/c_rgba";

function main() {
    /** @type nl3d.scene.UScene */
    var scene = new CSceneUser();
    /** @type nl3d.landscape.ULandscape */
    var landscape = scene.createLandscape();

    landscape.setThreshold(0.0005);
    landscape.setZFunction(ZFunction.less);

    /** @type nlmisc.CRGBA */
    var diffuse = new CRGBA(0xff, 0xff, 0xff);
    /** @type nlmisc.CRGBA */
    var ambient = new CRGBA(0xff, 0xff, 0xff);
    landscape.setupStaticLight(diffuse, ambient, 1.0);

    var small_bank = "jungle.smallbank";
    var season_suffix = "_su"; // summer
    var far_bank = `jungle${season_suffix}.farbank`;
    landscape.loadBankFiles(small_bank, far_bank);

    landscape.postfixTileFilename(season_suffix);

    /** @type {function(progress: number)} */
    var progress = (progress) => {
        console.log("Progress: ", progress);
    };
    var zonesAdded;
    var zonesRemoved;
    /** @type nel.misc.CVector */
    var pos;
    landscape.refreshAllZonesAround(pos, 1000, zonesAdded, zonesRemoved, progress);
}



