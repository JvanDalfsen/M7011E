/// <reference path="./definitions/server.d.ts"/>

import express = require('express');
import RouterModule = require('router');
import ServerConfigModule = require('server-config');

export class Server {
    /** @var {Express} ExpressJS app. */
    private _app: express.Application = null;

    /** @var {ServerConfig} The current config used by this server instance. */
    private _config: ServerConfigModule.ServerConfig;


    constructor(config: ServerConfigModule.ServerConfig) {
        this._config = config;
    }

    public start(): void {
        this.setupExpressServer();
        this.setupMongoose();
    }

    private setupExpressServer(): void {
        var express = require('express');

        this._app = express();

        // Setup the basic configuration for expressjs.
        this._app.use(express.logger('dev'));
        this._app.use(express.favicon());
        this._app.use(express.json());
        this._app.use(express.urlencoded());;
        this._app.use(express.methodOverride());
        this._app.use(express.cookieParser('secret'));
        this._app.use(express.session());
        this._app.use(express.bodyParser({ keepExtensions: true, uploadDir: './client/uploads' }));

        // TODO: Test why this.config() doesn't works.
        if (this._config.compress) {
            this._app.use(express.compress());
        }

        // The last middlewares must be the error handlers in case we want to handle them with another one.
        this._app.use(express.errorHandler());

        // Install dynamic routes.
        RouterModule.Router.setupRoutes(this._app);

        // Install static routes.
        var staticFolder: string = process.cwd() + '/' + this._config.staticFolderPath;
        console.log('The folder "' + staticFolder + '" will be served as static.');
        this._app.use(express.static(staticFolder));

        // Pin-point the source-map to the right file.
        this._app.use(express.static(process.cwd() + '/client'));

        this._app.listen(this._config.port, () => {
            console.log('Server started to listen on port: ' + this._config.port);
        });
    }

    private setupMongoose(): void {
        var mongoose = require('mongoose');

        console.log('Connecting mongoose on ' + this._config.database);

        // Connect mongoose to the MongoDB's database.
        mongoose.connect(this._config.database);

        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.once('open', () => {
            console.log('Mongoose\'s connection opened on ' + this._config.database);
        });
    }

    public get config(): ServerConfigModule.ServerConfig {
        return this._config;
    }

    public set config(config: ServerConfigModule.ServerConfig) {
        this._config = config;
    }
}