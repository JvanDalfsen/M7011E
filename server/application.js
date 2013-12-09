/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./server-config.ts"/>
/// <reference path="./server.ts"/>
var ServerModule = require('./server');
var ServerConfigModule = require('./server-config');

var MyCalendar;
(function (MyCalendar) {
    var Application = (function () {
        function Application(configPath) {
            console.log('Loading configuration...');

            var config = ServerConfigModule.ServerConfig.createFromFile(configPath);

            if (config === null) {
                console.log('Failed to parsed the configuration: ' + configPath);
                return;
            }

            console.log('Starting server...');
            var server = new ServerModule.Server(config);
            server.start();
            console.log('Server started');
        }
        return Application;
    })();
    MyCalendar.Application = Application;
})(MyCalendar || (MyCalendar = {}));

// Start the server.
new MyCalendar.Application('config.json');
//# sourceMappingURL=application.js.map
