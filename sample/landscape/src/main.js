import THREE from "three";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
var mesh;

camera.position.x = 18000;
camera.position.y = -30000;
camera.position.z = 1000;
camera.rotation.x = 0.05;

var render = function () {
    requestAnimationFrame(render);

    if ( mesh ) {
        //mesh.rotation.x += 0.05;
        //mesh.rotation.y += 0.025;
    }

    renderer.render(scene, camera);
};

render();

import CZone from "nel/3d/landscape/zone/c_zone";
import CReadFile from "nel/io/c_read_file";

window.CReadFile = CReadFile;
window.handleFiles = function ( files ) {
    for( var i = 0; i < files.length; ++i ) {
        openFile(files.item(i));
    }
};

function openFile( file ) {
    CReadFile.open(file).then(stream => {
        console.log("reading");
        var model = window.model = stream.read(CZone);
        console.log("done reading", model);
        var geometry = new THREE.Geometry();
        var length = model.patches.length;
        var bias = new THREE.Vector3(model.patch_bias.x, model.patch_bias.y, model.patch_bias.z);
        for ( var i = 0; i < length; ++i ) {
            var patch = model.patches[ i ];
            pushVertices(patch, model.patch_scale, bias, geometry);
            createFaces(i, geometry);
        }

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }).catch(console.error.bind(console, "error"));
}

function pushVertices( patch, scale, bias, geometry ) {
    for ( var i = 0; i < 4; ++i ) {
        var vertex = patch.vertices[ i ];
        vertex = new THREE.Vector3(vertex.x, vertex.y, vertex.z).multiplyScalar(scale).add(bias);
        geometry.vertices.push(vertex);
    }
}

function createFaces( i, geometry ) {
    var c = i * 4;

    geometry.faces.push(new THREE.Face3(c, c + 1, c + 2));
    geometry.faces.push(new THREE.Face3(c, c + 2, c + 3));
}
