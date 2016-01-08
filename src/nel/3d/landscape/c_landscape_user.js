/**
 * @class nl3d.landscape.CLandscapeUser
 * @implements {nl3d.landscape.ULandscape}
 */
export default class CLandscapeUser {

    /**
     * @constructor
     * @param {nl3d.scene.CScene} scene
     */
    constructor( scene ) {
        console.assert(scene);

        /**
         * @type {nl3d.scene.CScene}
         * @private
         */
        this._scene = scene;
        /**
         * @type {nl3d.landscape.CLandscapeModel}
         * @private
         */
        this._model = scene.createLandscapeModel();
    }

    /**
     * @override
     */
    setThreshold( threshold ) {
        this._model.landscape.setThreshold(threshold);
    }

    /**
     * @override
     */
    setZFunction( z_function ) {
        this._model.landscape.setZFunction(z_function);
    }

    /**
     * @override
     */
    setupStaticLight( diffuse, ambient, multiply ) {
        this._model.landscape.setupStaticLight(diffuse, ambient, multiply);
    }

    /**
     * @override
     * @param {string} tile_bank_file
     * @param {string} far_bank_file
     */
    loadBankFiles(){
        this._model.landscape.releaseAllTiles();
        //
        //// Clear the bank
        //_Landscape->Landscape.TileBank.clear ();
        //
        //// First, load the banks.
        ////=======================
        //CIFile bankFile(CPath::lookup(tileBankFile));
        //_Landscape->Landscape.TileBank.serial(bankFile);
        //// All textures path are relative!
        //_Landscape->Landscape.TileBank.makeAllPathRelative();
        //// Use DDS!!!
        //_Landscape->Landscape.TileBank.makeAllExtensionDDS();
        //// No absolute path
        //_Landscape->Landscape.TileBank.setAbsPath ("");
        //
        //CIFile farbankFile(CPath::lookup(farBankFile));
        //_Landscape->Landscape.TileFarBank.serial(farbankFile);
        //bankFile.close();
        //farbankFile.close();
    }
}
