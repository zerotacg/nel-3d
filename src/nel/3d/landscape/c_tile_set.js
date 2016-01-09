import CTileSetTransition from "nel/3d/landscape/c_tile_set_transition";
import Displacement from "nel/3d/landscape/displacement";
import Transition from "nel/3d/landscape/transition";

const VERSION = 5;

/**
 * @class nl3d.landscape.CTileSet
 * @implements {nlio.ISerializable}
 */
export default class CTileSet {
    /**
     * @param {nlio.IReadStream} stream
     * @return {nl3d.landscape.CTileSet}
     */
    static readFrom( stream ) {
        var instance = new CTileSet();
        instance.readFrom( stream );

        return instance;
    }

    static writeTo( stream, instance ) {
        instance.writeTo(stream);
    }

    constructor() {
        this.surcface_data = undefined;
        this.oriented = undefined;
        this.tile_vegetable_desc_filename = undefined;
        this.displacement_bitmaps = new Array(Displacement.count);
        this.name = undefined;
        this.tile_transitions = this.createTileTransitions();
    }

    createTileTransitions() {
        var array = new Array(Transition.count);
        for( var i = 0; i < Transition.count; ++i) {
            array[i] = new CTileSetTransition();
        }
        return array;
    }

    readFrom(stream) {
        var version;

        version = stream.readVersion();
        if ( version !== VERSION ) {
            var message = `The version in stream is compatible with this class expected version ${VERSION} but got ${version}`;

            throw new TypeError(message);
        }


        this.surcface_data = stream.readUint32();
        this.oriented = stream.readBool();
        this.tile_vegetable_desc_filename = stream.readString();
        this.readDisplacementBitmapsFrom(stream);

        this.name = stream.readString();
        //f.serialCont (_Tile128);
        //f.serialCont (_Tile256);

        this.readTileTransitionsFrom(stream);

        this.child_names = stream.readStringArray();
        //f.serial (_Border128[CTile::diffuse]);
        //f.serial (_Border128[CTile::additive]);
        //
        //f.serial (_Border256[CTile::diffuse]);
        //f.serial (_Border256[CTile::additive]);
        //
        //
        //for (i=0; i<count; i++)
        //{
        //    f.serial (_BorderTransition[i][CTile::diffuse]);
        //    f.serial (_BorderTransition[i][CTile::additive]);
        //    f.serial (_BorderTransition[i][CTile::alpha]);
        //}
    }

    readDisplacementBitmapsFrom( stream ) {
        var displacements = this.displacement_bitmaps;

        for (var displace = Displacement.first; displace < Displacement.count; ++displace) {
            displacements[displace] = stream.readUint32();
        }
    }

    readTileTransitionsFrom( stream ) {
        var transitions = this.tile_transitions;
        for ( var i = 0; i < Transition.count; ++i) {
            stream.read(transitions[i]);
        }
    }

    writeTo(stream) {
        stream.writeVersion(VERSION);
    }
}
