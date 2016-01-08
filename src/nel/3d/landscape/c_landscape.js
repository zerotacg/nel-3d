/**
 * @class nl3d.landscape.CLandscape
 */
export default class CLandscape {
    /**
     * @method
     * @param {number} threshold
     */
    setThreshold() {}

    /**
     * @method
     * @param {nl3d.material.ZFunction} z_function
     */
    setZFunction() {}

    /**
     * @method
     * @param {nlmisc.CRGBA} diffuse
     * @param {nlmisc.CRGBA} ambient
     * @param {number} multiply
     */
    setupStaticLight() {}

    /**
     * @method
     */
    releaseAllTiles() {}
}
