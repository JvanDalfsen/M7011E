/// <reference path="./definitions/server.d.ts"/>
var MyCalendar;
(function (MyCalendar) {
    var ServerConfig = (function () {
        function ServerConfig(port, staticFolderPath, compress, database) {
            this.port = port;
            this.staticFolderPath = staticFolderPath;
            this.compress = compress;
            this.database = database;
            // Note: port and staticFolderPath... are automatically declared as members.
        }
        ServerConfig.createFromFile = function (filePath) {
            var fs = require('fs');

            var err, data = fs.readFileSync(filePath, 'utf8');

            if (err) {
                console.log(err);
                return null;
            }

            try  {
                var config = JSON.parse(data);

                config.port = typeof config.port == undefined ? 6666 : config.port;
                config.staticFolderPath = typeof config.staticFolderPath == undefined ? 'static' : config.staticFolderPath;
                config.compress = typeof config.compress == undefined ? true : config.compress;
                config.database = typeof config.database == undefined ? 'mongodb://localhost/mycalendar' : config.database;

                return new ServerConfig(config.port, config.staticFolderPath, config.compress, config.database);
            } catch (err) {
                console.log(err);
                return null;
            }
        };
        return ServerConfig;
    })();
    MyCalendar.ServerConfig = ServerConfig;
})(MyCalendar || (MyCalendar = {}));
