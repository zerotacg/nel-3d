import AModel from "nel/io/a_model";
import { uint8 } from "nel/io/read_stream";
import CArray from "nel/misc/c_array";

/**
 * @class nl3d.landscape.zone.CTileLightInfluence
 * @implements nlio.ISerializable
 */
export default class CTileLightInfluence {
    static readFrom(stream) {
        return stream.readModel(CTileLightInfluence);
    }

    static create( data ) {
        return new CTileLightInfluence(data);
    }

    constructor( config ) {
        Object.assign(this, config);
    }
}

CTileLightInfluence.fields = [
    { type: CArray.template(uint8, 2), name: "light" },
    { type: uint8, name: "packed_light_factor" }
];
