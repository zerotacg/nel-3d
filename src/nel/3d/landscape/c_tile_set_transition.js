const VERSION = 1;

/**
 * @class nl3d.landscape.CTileSetTransition
 * @implements {nlio.ISerializable}
 */
export default class CTileSetTransition {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nl3d.landscape.CTileSetTransition}
     */
    static readFrom( stream ) {
        var instance = new CTileSetTransition();
        instance.readFrom( stream );

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.tile = undefined;
    }

    readFrom(stream) {
        var version;

        version = stream.readVersion();
        if ( version !== VERSION ) {
            var message = `The version in stream is compatible with this class expected version ${VERSION} but got ${version}`;

            throw new TypeError(message);
        }

        this.tile = stream.readSint32();
    }

    writeTo(stream) {
        stream.writeVersion(VERSION);
        stream.writeSint32(this.tile);
    }
}
