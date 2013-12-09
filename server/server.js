/// <reference path="./definitions/server.d.ts"/>
var express = require('express');
var RouterModule = require('./router');

var Server = (function () {
    function Server(config) {
        /** @var {Express} ExpressJS app. */
        this._app = null;
        this._config = config;
    }
    Server.prototype.start = function () {
        this.setupExpressServer();
        this.setupMongoose();
    };

    Server.prototype.setupExpressServer = function () {
        var _this = this;
        var express = require('express');

        this._app = express();

        // Setup the basic configuration for expressjs.
        this._app.use(express.logger('dev'));
        this._app.use(express.favicon());
        this._app.use(express.json());
        this._app.use(express.urlencoded());
        ;
        this._app.use(express.methodOverride());
        this._app.use(express.cookieParser('secret'));
        this._app.use(express.session());

        // TODO: Test why this.config() doesn't works.
        if (this._config.compress) {
            this._app.use(express.compress());
        }

        // The last middlewares must be the error handlers in case we want to handle them with another one.
        this._app.use(express.errorHandler());

        // Install dynamic routes.
        RouterModule.Router.setupRoutes(this._app);

        // Install static routes.
        var staticFolder = process.cwd() + '/' + this._config.staticFolderPath;
        console.log('The folder "' + staticFolder + '" will be served as static.');
        this._app.use(express.static(staticFolder));

        // Pin-point the source-map to the right file.
        this._app.use(express.static(process.cwd() + '/client'));

        console.log('$PORT: ' + process.env.PORT);

        this._app.listen(process.env.PORT || this._config.port, function () {
            console.log('Server started to listen on port: ' + _this._config.port);
        });
    };

    Server.prototype.setupMongoose = function () {
        var _this = this;
        var mongoose = require('mongoose');

        console.log('Connecting mongoose on ' + this._config.database);

        // Connect mongoose to the MongoDB's database.
        mongoose.connect(this._config.database);

        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.once('open', function () {
            console.log('Mongoose\'s connection opened on ' + _this._config.database);
        });
    };

    Object.defineProperty(Server.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });

    return Server;
})();
exports.Server = Server;
//# sourceMappingURL=server.js.map
