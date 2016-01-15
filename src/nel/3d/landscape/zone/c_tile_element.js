import { uint16 } from "nel/io/read_stream";
import CArray from "nel/misc/c_array";

/**
 * @class nl3d.landscape.zone.CTileElement
 * @implements nlio.ISerializable
 */
export default class CTileElement {
    static readFrom(stream) {
        return stream.readModel(CTileElement);
    }

    static create( data ) {
        return new CTileElement(data);
    }

    constructor( config ) {
        Object.assign(this, config);
    }
}

CTileElement.fields = [
    { type: uint16, name: "flags" },
    { type: CArray.template(uint16, 3), name: "tile_ids" }
];
