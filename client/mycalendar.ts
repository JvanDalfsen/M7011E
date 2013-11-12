/// <reference path="./definitions/jquery.d.ts"/>

// Start the script when the page is ready.
$(() => {
    $('#test-button').click((event: JQueryEventObject) => {
        alert('It\'s Fika time!');
    });
});