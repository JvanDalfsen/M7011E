M7011E
======

Description:
==

The goal of this project is to build a website where users can create and manage their own calandar. the goal is to provide a tool that combine the features from doodle and a standard calendar (ie: Google calendar). Users can create items (like a normal calendar), but additionally a user can invite other people to an item. Users can upload files (ie: pdf files, images) to an item, either private (only uploader has access) or shared (alle users that are sharing an item have access).
Managing new accounts is always considered as a boring task. We do hope to integrate our web-service with the applications already available on the market (g+, Facebook, etc). Finally, as being a proof of concept for a course, our project targets the latest technologies/devices.


Technologies:
==

This web-service is written using the following technologies:

Client side:

- JavaScript, HTML5 and CSS3

- JQuery, AngularJS and HandleBars


Server side:

- NodeJS, ExpressJS

- MongoDB, Mongoose


Communication:

- REST API, JSON


Setup the project:
==

1. Install Node.js and its packet manager npm.

2. Use the command `npm install` at the root of the project's folder to install its dependencies.

3. Use the command `node ./build/build.js` to build the entire project.

Run the project:
==

1. Setup the project.

2. Edit the file server/config.json according to your needs.

3. Use the command `node ./bin/server.js`.

4. The server should be started on the port you specified.



