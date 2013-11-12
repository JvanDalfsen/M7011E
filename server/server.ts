/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./server-config.ts"/>

module MyCalendar {

    export class Server {
        /** @var {Express} ExpressJS app. */
        private app: Express = null;

        /** @var {ServerConfig} The current config used by this server instance. */
        private _config: ServerConfig;

        constructor(config: ServerConfig) {
            this._config = config;
        }

        public start(): void {
            var express = require('express');

            this.app = express();

            // Setup the basic configuration for expressjs.
            this.app.use(express.logger('dev'));
            this.app.use(express.favicon());
            this.app.use(express.json());
            this.app.use(express.urlencoded());;
            this.app.use(express.methodOverride());
            this.app.use(express.cookieParser('secret'));
            this.app.use(express.session());

            // TODO: Test why this.config() doesn't works.
            if (this._config.compress) {
                this.app.use(express.compress());
            }

            // The last middlewares must be the error handlers in case we want to handle them with another one.
            this.app.use(express.errorHandler());

            // Install static routes.
            var staticFolder: string = process.cwd() + '/' + this._config.staticFolderPath;
            console.log('The folder "' + staticFolder + '" will be served as static.');  
            this.app.use(express.static(staticFolder));

            // Pin-point the source-map to the right file.
            this.app.use(express.static(process.cwd() + '/client'));

            this.app.listen(this._config.port, () => {
                console.log('Server started to listen on port: ' + this._config.port);
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