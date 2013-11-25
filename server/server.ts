/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./server-config.ts"/>
/// <reference path="./router.ts"/>

module MyCalendar {

    export class Server {
        /** @var {Express} ExpressJS app. */
        private _app: Express = null;

        /** @var {ServerConfig} The current config used by this server instance. */
        private _config: ServerConfig;


        constructor(config: ServerConfig) {
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

            // TODO: Test why this.config() doesn't works.
            if (this._config.compress) {
                this._app.use(express.compress());
            }

            // The last middlewares must be the error handlers in case we want to handle them with another one.
            this._app.use(express.errorHandler());

            // Install dynamic routes.
            Router.setupRoutes(this._app);

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

        public get config(): ServerConfig {
            return this._config;
        }

        public set config(config: ServerConfig) {
            this._config = config;
        }
    }

}