import { expect, default as chai } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import jspm from "jspm";

chai.use(sinonChai);


var System = jspm.Loader();

describe("nel.3d.landscape.CLandscapeUser", function () {
    var CLandscape;
    var CLandscapeUser;

    before("imports", function ( done ) {
        var imports = [
            "nel/3d/landscape/c_landscape",
            "nel/3d/landscape/c_landscape_user"
        ];
        Promise.all(imports.map(path => System.import(path)))
            .then(modules => {
                CLandscape = modules[ 0 ].default;
                CLandscapeUser = modules[ 1 ].default;
            })
            .then(done)
            .catch(done)
        ;
    });

    var landscape;
    var landscape_model;
    var landscape_user;
    var scene;

    beforeEach("setup", function () {
        landscape = new CLandscape();
        sinon.stub(landscape, "setThreshold");
        sinon.stub(landscape, "setZFunction");
        sinon.stub(landscape, "setupStaticLight");
        sinon.stub(landscape, "releaseAllTiles");

        landscape_model = {
            landscape
        };
        scene = {
            createLandscapeModel: function () {
                return landscape_model;
            }
        };
        landscape_user = new CLandscapeUser(scene);
    });

    describe("#constructor()", function () {
        it("should keep a reference to the scene", function () {
            var landscape = new CLandscapeUser(scene);

            expect(landscape).to.have.property("_scene", scene);
        });

        it("should create a model for the landscape", function () {
            expect(landscape_user).to.have.property("_model", landscape_model);
        });
    });

    describe("#setThreshold()", function () {
        it("should set the threshold of the model", function () {
            var threshold = 0.0005;

            landscape_user.setThreshold(threshold);

            expect(landscape.setThreshold).to.have.been.calledWith(threshold);
        });
    });

    describe("#setZFunction()", function () {
        it("should set the threshold of the model", function () {
            var z_function = "z function";

            landscape_user.setZFunction(z_function);

            expect(landscape.setZFunction).to.have.been.calledWith(z_function);
        });
    });

    describe("#setupStaticLight()", function () {
        it("should call setup of static light on the model", function () {
            var diffuse = {};
            var ambient = {};
            var multiply = 1.0;

            landscape_user.setupStaticLight(diffuse, ambient, multiply);

            expect(landscape.setupStaticLight).to.have.been.calledWith(diffuse, ambient, multiply);
        });
    });

    describe("#loadBankFiles()", function () {
        it("should call releasing of tiles on model", function () {
            var small_bank = "jungle_su.smallbank";
            var far_bank = "jungle_su.farbank";

            landscape_user.loadBankFiles(small_bank, far_bank);

            expect(landscape.releaseAllTiles).to.have.been.called;
        });
    });
});
