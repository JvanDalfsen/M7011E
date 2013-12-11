(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['about-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"document-manager-panel\">\r\n<!-- Note: use this div for the transistions -->\r\n  <article class=\"panel-message about-panel\">\r\n    <h3>Description:</h3>\r\n    <p>\r\n      The goal of this project is to provide a tool that combine the features from doodle and a standard calendar (ie: Google calendar).<br/>\r\n      Users can create items (like a normal calendar), but additionally a user can invite other people to an item.<br/>\r\n      Users can upload files (ie: pdf files, images) to an item, either private (only uploader has access) or shared (alle users that are sharing an item have access).<br/>\r\n    </p>\r\n    <p>\r\n      Managing new accounts is always considered as a boring task.<br/>\r\n      We do hope to integrate our web-service with the applications already available on the market (g+, Facebook, etc).<br/>\r\n      Finally, as being a proof of concept for a course, our project targets the latest technologies/devices.<br/>\r\n    </p>\r\n    <h3>Credits:</h3>\r\n    <p>\r\n      This project started at Lulea University Of Technology during the course \"Design of Dynamic Web Systems - M7011E 2013\"\r\n    </p>\r\n    \r\n    <p>\r\n      Authors: Jurian van Dalfsen, Jean Guegant\r\n    </p>\r\n\r\n    <p>\r\n      Supervised by: Peter Parnes\r\n    </p>\r\n  </article>\r\n</div>";
  });
templates['breadcrumb-button'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "﻿<li>\r\n  <a class=\"dark-blue-button breadcrumb-button\" selected=\"\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\r\n</li>";
  return buffer;
  });
templates['calendar-item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "﻿<article class=\"calendar-item remote-calendar\">\r\n    <div class=\"calendar-content\">\r\n      <input type=\"text\" class=\"calendar-name\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n      <br/>\r\n      <h3>";
  if (stack1 = helpers.events_count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.events_count); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + " events</h3>\r\n    </div>\r\n\r\n    <i class=\"dark-blue-button delete-document\"> </i>\r\n</article>";
  return buffer;
  });
templates['calendar-manager-panel-toolbar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"page-number\">\r\n  <p>\r\n    << 1/1 >>\r\n  </p>\r\n</div>\r\n<div id=\"add-button\" class=\"dark-blue-button toolbar-button\">\r\n	<img src=\"./icons/add-button.png\" />\r\n</div>";
  });
templates['calendar-manager-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\r\n<!-- Note: use this div for the transitions -->\r\n<!-- What kind of transitions? does this handlebar need this div too? -->\r\n  <div id=\"calendar\"></div>\r\n</div>";
  });
templates['document-item-upload'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "﻿<article class=\"file-uploading-item\">\r\n  <div class=\"uploading-progress\">\r\n    \r\n  </div>\r\n  <div class=\"file-title\">\r\n    <h3>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n	</div>\r\n</article>";
  return buffer;
  });
templates['document-item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n  <div class=\"file-picture\">\r\n    <div style=\"width: 300px; height: 200px; background-image:url('";
  if (stack1 = helpers.picture_path) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.picture_path); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "'); background-repeat:no-repeat; background-size:contain;\" />\r\n  </div>\r\n  ";
  return buffer;
  }

  buffer += "﻿<article class=\"file-item uploaded-file\">  \r\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.picture_path), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  \r\n  <div class=\"file-title\">\r\n    <input type=\"text\" value=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n	</div>\r\n\r\n  <i class=\"dark-blue-button delete-document\"> </i>\r\n  <a href=\"";
  if (stack1 = helpers.document_path) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.document_path); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"dark-blue-button download-document\"/>\r\n</article>";
  return buffer;
  });
templates['document-manager-panel-toolbar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"page-number\">\r\n  <p>\r\n    Your documents:\r\n  </p>\r\n</div>\r\n<div id=\"save-button\" class=\"dark-blue-button toolbar-button\">\r\n  <img src=\"./icons/save-button.png\" />\r\n</div>";
  });
templates['document-manager-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"document-manager-panel\">\r\n<!-- Note: use this div for the transistions -->\r\n  <article class=\"file-item\">\r\n	  <div class=\"file-title\">\r\n		  <h3 id=\"upload-area\">Drag a document to upload!</h3>\r\n	  </div>\r\n  </article>\r\n</div>";
  });
templates['help-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"document-manager-panel\">\r\n<!-- Note: use this div for the transistions -->\r\n  <article class=\"panel-message\">\r\n    <h3>Help:</h3>\r\n    <p>\r\n     Contact us at: jeague-3@student.ltu.se or jurvan-3@student.ltu.se\r\n    </p>\r\n    <h3>Bug reports / issues:</h3>\r\n    <p>\r\n      Please report your problems on our repository: https://github.com/JvanDalfsen\r\n    </p>\r\n  </article>\r\n</div>";
  });
templates['home-panel-toolbar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"page-number\">\r\n  Your calendars:\r\n</div>";
  });
templates['home-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"home-panel\">\r\n  <!-- Note: use this div for the transistions -->\r\n  <article class=\"calendar-item\" id =\"create-calendar\">\r\n    <div class=\"calendar-content\">\r\n      <h2>Create a new calendar!</h2>\r\n      <img src=\"/icons/add-button.png\" alt=\"add\" width=\"50\" height=\"50\"/>\r\n    </div>\r\n  </article>\r\n</div>";
  });
templates['item-manager-panel-toolbar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"page-number\">\r\n  <p>\r\n    << 1/1 >>\r\n  </p>\r\n</div>\r\n<div id=\"delete-button\" class=\"dark-blue-button toolbar-button\">\r\n  <img src=\"./icons/close-button-small.png\" />\r\n</div>\r\n<div id=\"save-button\" class=\"dark-blue-button toolbar-button\">\r\n  <img src=\"./icons/save-button.png\" />\r\n</div>\r\n<div id=\"calendar-button\" class=\"dark-blue-button toolbar-button\">\r\n	<img src=\"./icons/calendar-button.png\" />\r\n</div>\r\n";
  });
templates['item-manager-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\r\n<!-- Note: use this div for the transistions -->\r\n<!-- this div needed here? -->\r\n	<div id=\"item-create-frame\">\r\n		<form>\r\n			<label>Title:</label> <input type=\"text\" id=\"title\" size=\"23\" /><br />\r\n			<label>From:</label> <input type=\"text\" id=\"fromTime\" value=\"12:00\" size=\"6\"/>, <input class=\"datepicker\" type=\"text\" id=\"fromDate\" value=\"01-01-2014\" size=\"11\"/><br />\r\n			<label>To:</label> <input type=\"text\" id=\"toTime\" value=\"13:00\" size=\"6\"/>, <input class=\"datepicker\" type=\"text\" id=\"toDate\" value=\"01-01-2014\" size=\"11\"/><br />\r\n			<label>Location:</label> <input type=\"text\" id=\"location\" size=\"23\" /><br />\r\n			<label>Description:</label> <textarea id=\"description\" cols=\"18\" rows=\"6\"></textarea><br />\r\n      <input type=\"hidden\" id=\"new-event\" value=\"1\"/>\r\n    </form>\r\n    <br />\r\n    <div class=\"dark-blue-button item-manager-button\" id=\"documents-button\">\r\n      <h2>Documents</h2>\r\n    </div>\r\n	</div>\r\n</div>";
  });
templates['offline-home-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"document-manager-panel\">\r\n<!-- Note: use this div for the transistions -->\r\n  <article class=\"panel-message\">\r\n    <h3>Welcome to My Calendar! <br/> Connect yourself in order to access our features!</h3>\r\n  </article>\r\n</div>";
  });
templates['offline-user-connection'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<li class=\"deep-dark-blue-button\">\r\n  <a href=\"/api/auth/google\">\r\n    Connection\r\n    <img src=\"icons/google-plus-small.png\" alt=\"disconnect\" width=\"19\" height=\"19\"/>\r\n  </a>\r\n</li>";
  });
templates['offline-user-infos'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"user-settings-button\" class=\"deep-dark-blue-button avatar\">\r\n    <p>Offline</p>\r\n    <img src=\"images/cartoon-avatar.png\" alt=\"avatar\" width=\"45\" height=\"45\"/>\r\n</div>\r\n<div id=\"user-details\" class=\"hidable-menu\">\r\n  <p>No data</p>\r\n</div>";
  });
templates['user-connection'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<li class=\"deep-dark-blue-button\">\r\n  <a href=\"/api/auth/logout\">\r\n    Disconnect\r\n    <img src=\"icons/lock-button-small.png\" alt=\"disconnect\" width=\"19\" height=\"19\"/>\r\n  </a>\r\n</li>\r\n<li class=\"deep-dark-blue-button\">\r\n  <p>\r\n    Delete this account\r\n    <img src=\"icons/close-button-small.png\" alt=\"disconnect\" width=\"19\" height=\"19\"/>\r\n  </p>\r\n</li>\r\n";
  });
templates['user-infos'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <p>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\r\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <p>"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\r\n    ";
  return buffer;
  }

  buffer += "﻿<div id=\"user-settings-button\" class=\"deep-dark-blue-button avatar\">\r\n    <p>";
  if (stack1 = helpers.displayName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.displayName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    <img src=\"images/cartoon-avatar.png\" alt=\"avatar\" width=\"45\" height=\"45\"/>\r\n</div>\r\n<div id=\"user-details\" class=\"hidable-menu\">\r\n    <p>Firstname: ";
  if (stack1 = helpers.firstname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.firstname); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    <p>Lastname: ";
  if (stack1 = helpers.lastname) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.lastname); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.emails), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    <p>Last seen: ";
  if (stack1 = helpers.lastConnection) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.lastConnection); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\r\n</div>";
  return buffer;
  });
})();