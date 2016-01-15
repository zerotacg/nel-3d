import THREE from "three";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
};

//render();

import CZone from "nel/3d/landscape/zone/c_zone";
import CReadFile from "nel/io/c_read_file";

window.CReadFile = CReadFile;
window.handleFiles = function ( files ) {
    console.log("set file");
    var file = window.file = files.item(0);
    CReadFile.open(file).then(stream => {
        console.log("reading");
        var model = window.model = stream.readModel(CZone);
        console.log("done reading", model);
    }).catch(console.error.bind(console, "error"));
};
