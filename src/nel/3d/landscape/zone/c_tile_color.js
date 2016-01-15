import { uint16 } from "nel/io/read_stream";
import CArray from "nel/misc/c_array";

/**
 * @class nl3d.landscape.zone.CTileColor
 * @implements nlio.ISerializable
 */
export default class CTileColor {
    static readFrom(stream) {
        return stream.readModel(CTileColor);
    }

    static create( data ) {
        return new CTileColor(data);
    }

    constructor( config ) {
        Object.assign(this, config);
    }
}

CTileColor.fields = [
    { type: uint16, name: "color_565" }
];
