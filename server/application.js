/// <reference path="./definitions/server.d.ts"/>
/// <reference path="./server-config.ts"/>
/// <reference path="./server.ts"/>
var MyCalendar;
(function (MyCalendar) {
    var Application = (function () {
        function Application(configPath) {
            console.log('Loading configuration...');

            var config = MyCalendar.ServerConfig.createFromFile(configPath);

            if (config === null) {
                console.log('Failed to parsed the configuration: ' + configPath);
                return;
            }

            console.log('Starting server...');
            var server = new MyCalendar.Server(config);
            server.start();
            console.log('Server started');
        }
        return Application;
    })();
    MyCalendar.Application = Application;
})(MyCalendar || (MyCalendar = {}));

// Start the server.
new MyCalendar.Application('config.json');
