import CTile from "nel/3d/landscape/c_tile";
import CTileLand from "nel/3d/landscape/c_tile_land";
import CTileNoise from "nel/3d/landscape/c_tile_noise";
import CTileSet from "nel/3d/landscape/c_tile_set";

const VERSION = 4;

const HEADER = "BANK";

/**
 * @class nl3d.landscape.CTileBank
 * @implements {nlio.IReadable}
 */
export default class CTileBank {
    /**
     *
     */
    readFrom( stream ) {
        var version;

        stream.readCheckString(HEADER);

        version = stream.readVersion();
        if ( version !== VERSION ) {
            var message = `The version in stream is compatible with this class expected version ${VERSION} but got ${version}`;

            throw new TypeError(message);
        }

        this.readDisplacementMapsFrom(stream);
        this.readAbsolutePathFrom(stream);
        this.readTileLandsFrom(stream);
        this.readTileSetsFrom(stream);
        this.readTilesFrom(stream);
        this.computeXRef();
    }

    readDisplacementMapsFrom( stream ) {
        var maps = stream.readArray(CTileNoise.readFrom);

        console.assert(maps.length);

        maps[ 0 ] = CTileNoise.BLANK;

        this.displacement_maps = maps;
    }

    readAbsolutePathFrom(stream) {
        this.absolue_path = stream.readString();
    }

    readTileLandsFrom(stream) {
        this.tile_lands = stream.readArray(CTileLand.readFrom);
    }

    readTileSetsFrom(stream) {
        this.tile_sets = stream.readArray(CTileSet.readFrom);
    }

    readTilesFrom(stream) {
        this.tiles = stream.readArray(CTile.readFrom);
    }

    computeXRef() {}

    /**
     *
     */
    clear() {}

    /**
     *
     */
    makeAllPathsRelative() {}

    /**
     *
     */
    makeAllExtensionsDDS() {}

    /**
     *
     */
    setAbsPath() {}
}
