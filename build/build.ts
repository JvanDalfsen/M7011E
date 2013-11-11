/// <reference path="./definitions/node.d.ts"/>

var exec = require('child_process').exec;

var buildSteps: { message: string; command: string }[] = [
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

buildSteps.forEach((value: { message: string; command: string }, index: number): void => {
    exec((err: any, stdout: any, stderr: any) => {
        if (err) {
            console.log(err);
            console.log(stdout);
            console.log(stderr);
        }
    });
});

console.log('Build finished!');