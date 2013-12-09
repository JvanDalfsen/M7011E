/// <reference path="./definitions/server.d.ts"/>

export class ServerConfig {
    constructor(
        public port: number,
        public staticFolderPath: string,
        public compress: boolean,
        public database: string) {
        // Note: port and staticFolderPath... are automatically declared as members.
    }

    public static createFromFile(filePath: string): ServerConfig {
        var fs = require('fs');
            
        var err, data = fs.readFileSync(filePath, 'utf8');

        if (err) {
            console.log(err);
            return null;
        }

        try {
            var config = JSON.parse(data);

            config.port             = typeof config.port == undefined ? 6666 : config.port;
            config.staticFolderPath = typeof config.staticFolderPath == undefined ? 'static' : config.staticFolderPath;
            config.compress         = typeof config.compress == undefined ? true : config.compress;
            config.database         = typeof config.database == undefined ? 'mongodb://localhost/mycalendar' : config.database;

            return new ServerConfig(
                <number>config.port,
                <string>config.staticFolderPath,
                <boolean>config.compress,
                <string>config.database
                );

        } catch (err) {
            console.log(err);
            return null;
        }

    }
}