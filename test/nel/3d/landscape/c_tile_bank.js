import { expect } from "chai";
import jspm from "jspm";

var System = jspm.Loader();

describe("nel.3d.landscape.CTileBank", function () {
    var CTileBank;
    var CBuffer;
    var CReadStream;
    var CWriteStream;

    before("imports", function ( done ) {
        var imports = [
            "nel/3d/landscape/c_tile_bank",
            "nel/io/buffer",
            "nel/io/read_stream",
            "nel/io/write_stream"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CTileBank = modules[ 0 ].default;
                CBuffer = modules[ 1 ].default;
                CReadStream = modules[ 2 ].default;
                CWriteStream = modules[ 3 ].default;
            })
            .then(done)
            .catch(done)
        ;
    });

    var tile_bank;
    var buffer;
    var stream;

    beforeEach("setup", function () {
        tile_bank = new CTileBank();
        buffer = new CBuffer(16);
        var write_stream = new CWriteStream(buffer);
        write_stream.writeString("BANK");
        console.log("buffer", buffer.toString());

        stream = new CReadStream(buffer);
    });

    describe("#readFrom()", function () {
        context("when not starting with bank header", function () {
            it("should throw", function () {
                expect(() => tile_bank.readFrom(stream)).to.throw(TypeError);
            });
        });

        context("when starting with bank header", function () {
            it("should not throw", function () {
                expect(() => tile_bank.readFrom(stream)).to.not.throw(TypeError);
            });
        });
    });
});
