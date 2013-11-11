/// <reference path="./definitions/node.d.ts"/>
var exec = require('child_process').exec;

var buildSteps = [
    {
        message: 'Compiling the server...',
        command: 'node ./node_modules/typescript/bin/tsc server/application.ts \
                  --out bin/server.js \
                  --target ES5 --sourcemap'
    },
    {
        message: 'Compiling the client...',
        command: 'node ./node_modules/typescript/bin/tsc client/mycalendar.ts \
                  --out bin/mycalendar.js \
                  --target ES5 --sourcemap'
    }
];

buildSteps.forEach(function (value, index) {
    exec(function (err, stdout, stderr) {
        if (err) {
            console.log(err);
            console.log(stdout);
            console.log(stderr);
        }
    });
});

console.log('Build finished!');
