
/**
 *
 */
export const VERSION = 4;

export const HEADER_CHECK = "BANK";

/**
 * @class nl3d.landscape.CTileBank
 * @implements {nlio.IReadable}
 */
export default class CTileBank {
    /**
     *
     */
    readFrom(stream) {
        stream.readCheckString(HEADER_CHECK);
    }

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
