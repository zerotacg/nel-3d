import CTileFar from "nel/3d/landscape/tile/c_tile_far";

const HEADER = "FAR_BANK";
const VERSION = 0;

/**
 * @class nl3d.landscape.CTileFarBank
 * @implements {nlio.ISerializable}
 */
export default class CTileFarBank {
    readFrom( stream ) {
        stream.readCheckChars(HEADER);

        stream.readVersion();

        this.tiles = stream.readArray(CTileFar.readFrom);
    }

    writeTo( stream ) {
        stream.writeChars(HEADER);

        stream.writeVersion(VERSION);

        stream.writeArray(this.tiles);
    }
}

CTileFarBank.fields = [
    { type: "check-chars", value: "FAR_BANK" },
    { type: "version", value: 0 },
    { type: Array.template(CTileFar), name: "tiles" }
];
