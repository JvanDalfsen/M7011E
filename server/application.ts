/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./server-config.ts"/>
/// <reference path="./server.ts"/>

import ServerModule = require('server');
import ServerConfigModule = require('server-config');

module MyCalendar {

    export class Application {

        constructor(configPath: string) {
            console.log('Loading configuration...');

            var config: ServerConfigModule.ServerConfig = ServerConfigModule.ServerConfig.createFromFile(configPath);

            if (config === null) {
                console.log('Failed to parsed the configuration: ' + configPath);
                return;
            }

            console.log('Starting server...');
            var server: ServerModule.Server = new ServerModule.Server(config);
            server.start();
            console.log('Server started');
        }

    }

}

// Start the server.
new MyCalendar.Application('config.json');