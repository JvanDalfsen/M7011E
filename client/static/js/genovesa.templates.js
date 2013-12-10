(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
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
  


  return "﻿<div id=\"page-number\">\r\n  <p>\r\n    << 1/1 >>\r\n  </p>\r\n</div>";
  });
templates['document-manager-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "﻿<div id=\"document-manager-panel\">\r\n<!-- Note: use this div for the transistions -->\r\n  <article class=\"file-item\">\r\n	  <div class=\"file-title\">\r\n		  <h3 id=\"upload-area\">Drag a document to upload!</h3>\r\n	  </div>\r\n  </article>\r\n</div>";
  });
templates['item-manager-panel-toolbar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"page-number\">\r\n  <p>\r\n    << 1/1 >>\r\n  </p>\r\n</div>\r\n<div id=\"calendar-button\" class=\"dark-blue-button toolbar-button\">\r\n	<img src=\"./icons/calendar-button.png\" />\r\n</div>";
  });
templates['item-manager-panel'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\r\n<!-- Note: use this div for the transistions -->\r\n<!-- this div needed here? -->\r\n	<div id=\"item-create-frame\">\r\n		<form>\r\n			<label>Title:</label> <input type=\"text\" id=\"title\" size=\"23\" /><br />\r\n			<label>From:</label> <input type=\"text\" id=\"fromTime\" value=\"12:00\" size=\"6\"/>, <input class=\"datepicker\" type=\"text\" id=\"fromDate\" value=\"01/01/2014\" size=\"11\"/><br />\r\n			<label>To:</label> <input type=\"text\" id=\"toTime\" value=\"13:00\" size=\"6\"/>, <input class=\"datepicker\" type=\"text\" id=\"toDate\" value=\"01/01/2014\" size=\"11\"/><br />\r\n			<label>Location:</label> <input type=\"text\" id=\"location\" size=\"23\" /><br />\r\n			<label>Calendar:</label> <select id=\"available-calendars\">\r\n				<!--remove these options after calendars can be added dynamically-->\r\n				<option value=\"calendar1\">Calendar1</option>\r\n				<option value=\"calendar2\">Calendar2</option>\r\n			</select><br />\r\n			<label>Description:</label> <textarea id=\"description\" cols=\"18\" rows=\"6\"></textarea><br />\r\n			<label>Documents:</label><ul id=\"added-documents\">\r\n				<!--remove these list-items after documents can be added dynamically-->\r\n				<li>Document 1</li>\r\n				<li>Document 2</li>\r\n			</ul><br />\r\n		</form>\r\n		<div class=\"dark-blue-button item-manager-button\" id=\"save-button\">\r\n			<h2>Save</h2>\r\n		</div>\r\n    <div class=\"dark-blue-button item-manager-button\" id=\"documents-button\">\r\n      <h2>Documents</h2>\r\n    </div>\r\n	</div>\r\n</div>";
  });
})();