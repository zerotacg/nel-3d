const VERSION = 4;
const HEADER = "ZONE";

/**
 * @class nl3d.landscape.zone.CZone
 * @implements nlio.ISerializable
 */
export default class CZone {
    readFrom( stream ) {
        stream.readCheckVersion(VERSION);
        stream.readCheckChars(HEADER);
    }
}
