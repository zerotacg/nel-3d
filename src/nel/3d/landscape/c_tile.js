const VERSION = 0;

/**
 * @class nl3d.landscape.CTile
 * @implements {nlio.ISerializable}
 */
export default class CTile {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nl3d.landscape.CTile}
     */
    static readFrom( stream ) {
        var instance = new CTile();
        instance.readFrom( stream );

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
    }

    readFrom(stream) {
    }

    writeTo(stream) {
    }
}
