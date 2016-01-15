import { CheckVersion } from "nel/io/read_stream";
import { uint16 } from "nel/io/read_stream";

const VERSION = 0;

/**
 * @class nl3d.landscape.zone.CBorderVertex
 * @implements nlio.ISerializable
 */
export default class CBorderVertex {
    static readFrom(stream) {
        return stream.readModel(CBorderVertex);
    }

    static create( data ) {
        return new CBorderVertex(data);
    }

    constructor( config ) {
        Object.assign(this, config);
    }
}

CBorderVertex.fields = [
    { type: CheckVersion, value: VERSION },
    { type: uint16, name: "current_vertex" },
    { type: uint16, name: "neighbor_zone_id" },
    { type: uint16, name: "neighbor_vertex" }
];
