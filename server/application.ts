/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./server-config.ts"/>
/// <reference path="./server.ts"/>

module MyCalendar {

    export class Application {

        constructor(configPath: string) {
            console.log('Loading configuration...');

            var config: ServerConfig = ServerConfig.createFromFile(configPath);

            if (config === null) {
                console.log('Failed to parsed the configuration: ' + configPath);
                return;
            }

            console.log('Starting server...');
            var server: Server = new Server(config);
            server.start();
            console.log('Server started');
        }

    }

}

// Start the server.
new MyCalendar.Application('config.json');