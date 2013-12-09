var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Model = (function () {
            function Model() {
            }
            Model.prototype.getRefId = function () {
                return this._id;
            };
            return Model;
        })();
        Models.Model = Model;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="./model.ts"/>
/// <reference path="../repository.ts"/>
/// <reference path="../definitions/jquery.d.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Ref = (function () {
            function Ref(_refid, _repo) {
                this._refid = _refid;
                this._repo = _repo;
            }
            Object.defineProperty(Ref.prototype, "id", {
                get: function () {
                    return this._refid;
                },
                enumerable: true,
                configurable: true
            });

            Ref.prototype.deference = function () {
                return this._repo.findById(this._refid);
            };
            return Ref;
        })();
        Models.Ref = Ref;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Document = (function (_super) {
            __extends(Document, _super);
            function Document() {
                _super.apply(this, arguments);
            }
            Document.prototype.getURI = function () {
                return '/documents/download/' + this.getRefId();
            };
            return Document;
        })(MyCalendar.Models.Model);
        Models.Document = Document;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="./document.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Event = (function (_super) {
            __extends(Event, _super);
            function Event() {
                _super.apply(this, arguments);
            }
            return Event;
        })(MyCalendar.Models.Model);
        Models.Event = Event;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="./ref.ts"/>
/// <reference path="./event.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (Models) {
        var Calendar = (function (_super) {
            __extends(Calendar, _super);
            function Calendar() {
                _super.apply(this, arguments);
            }
            return Calendar;
        })(MyCalendar.Models.Model);
        Models.Calendar = Calendar;
    })(MyCalendar.Models || (MyCalendar.Models = {}));
    var Models = MyCalendar.Models;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./models/model.ts"/>
/// <reference path="./models/calendar.ts"/>
/// <reference path="./models/event.ts"/>
var MyCalendar;
(function (MyCalendar) {
    var Repository = (function () {
        function Repository(_cstr) {
            this._cstr = _cstr;
            // _cstr: A trick to call the right constructor.
            // http://stackoverflow.com/questions/17382143/how-to-create-a-new-object-from-type-parameter-in-generic-class-in-typescript
            // This way we can compare the type of a dummy with instanceof.
            this._dummie = new this._cstr();
        }
        Repository.prototype.create = function (value) {
            var _this = this;
            return this.callAPI('POST', '', value).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.find = function (query) {
            var _this = this;
            return this.callAPI('GET', '', query).then(function (json) {
                return json.map(function (result, index, array) {
                    return _this.buildModel(result);
                });
            });
        };

        Repository.prototype.findById = function (id) {
            var _this = this;
            return this.callAPI('GET', '/' + id).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.update = function (id, value) {
            var _this = this;
            return this.callAPI('PUT', '/' + id, value).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.save = function (obj) {
            var _this = this;
            if (this.isCalendar()) {
                // Transform the ref into strings.
                obj.events = obj.events.map(this.extractRef);
            }

            if (this.isEvent()) {
                // Transform the ref into strings.
                obj.documents = obj.documents.map(this.extractRef);
            }

            return this.callAPI('PUT', '/' + obj.getRefId(), obj).then(function (json) {
                var value = _this.buildModel(json);

                for (var prop in value) {
                    // Update the _id of the object.
                    obj[prop] = value[prop];
                }

                return obj;
            });
        };

        Repository.prototype.delete = function (obj) {
            return this.deleteById(obj.getRefId());
        };

        Repository.prototype.deleteById = function (id) {
            var _this = this;
            return this.callAPI('DELETE', '/' + id).then(function (json) {
                return _this.buildModel(json);
            });
        };

        Repository.prototype.buildModel = function (json) {
            if (this.isCalendar()) {
                var calendar = new MyCalendar.Models.Calendar();
                calendar._id = json._id;
                calendar.name = json.name;

                // Copy the references.
                var events = json.events;

                calendar.events = events.map(function (value, index, array) {
                    return new MyCalendar.Models.Ref(value, MyCalendar.eventsRepository);
                });

                return calendar;
            } else if (this.isDocument()) {
                var document = new MyCalendar.Models.Document();

                for (var prop in json) {
                    document[prop] = json[prop];
                }

                return document;
            } else if (this.isEvent()) {
                var event = new MyCalendar.Models.Event();
                event._id = json._id;
                event.begin = json.being;
                event.end = json.end;
                event.name = json.name;
                event.description = json.description;

                // Copy the references.
                var documents = json.documents;

                event.documents = documents.map(function (value, index, array) {
                    return new MyCalendar.Models.Ref(value, MyCalendar.documentsRepository);
                });

                return event;
            }

            return null;
        };

        Repository.prototype.getRoute = function () {
            if (this.isCalendar()) {
                return '/calendars';
            } else if (this.isEvent()) {
                return '/events';
            } else if (this.isDocument()) {
                return '/documents';
            }

            throw 'no route avaiblable for this type';

            return null;
        };

        Repository.prototype.callAPI = function (type, url, data) {
            if (typeof url === "undefined") { url = ''; }
            if (typeof data === "undefined") { data = {}; }
            return $.ajax({
                type: type,
                url: Repository.ApiRoot + this.getRoute() + url,
                data: data,
                dataType: 'json',
                success: function (json, textStatus, jqXHR) {
                    return json;
                }
            });
        };

        Repository.prototype.isCalendar = function () {
            return this._dummie instanceof MyCalendar.Models.Calendar;
        };

        Repository.prototype.isEvent = function () {
            return this._dummie instanceof MyCalendar.Models.Event;
        };

        Repository.prototype.isDocument = function () {
            return this._dummie instanceof MyCalendar.Models.Document;
        };

        Repository.prototype.extractRef = function (value, index, array) {
            return value.id;
        };
        Repository.ApiRoot = '/api';
        return Repository;
    })();
    MyCalendar.Repository = Repository;

    MyCalendar.eventsRepository = new Repository(MyCalendar.Models.Event);
    MyCalendar.calendarsRepository = new Repository(MyCalendar.Models.Calendar);
    MyCalendar.documentsRepository = new Repository(MyCalendar.Models.Document);
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../idynamic-view.ts"/>
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../idynamic-view.ts"/>
/// <reference path="../toolbars/itoolbar.ts"/>
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="./itoolbar.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        (function (Toolbars) {
            /**
            * Interface that every toolbar should implements.
            */
            var DocumentManagerToolbar = (function () {
                function DocumentManagerToolbar() {
                }
                DocumentManagerToolbar.prototype.onload = function () {
                    // Empty now.
                };

                DocumentManagerToolbar.prototype.onremove = function () {
                };

                DocumentManagerToolbar.prototype.view = function () {
                    return $(Handlebars.templates['document-manager-panel-toolbar']());
                };
                return DocumentManagerToolbar;
            })();
            Toolbars.DocumentManagerToolbar = DocumentManagerToolbar;
        })(UI.Toolbars || (UI.Toolbars = {}));
        var Toolbars = UI.Toolbars;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/document-manager-toolbar.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        (function (Panels) {
            var DocumentManagerPanel = (function () {
                function DocumentManagerPanel() {
                }
                DocumentManagerPanel.prototype.onload = function () {
                    this._uploadArea = $('#upload-area');
                    this._panel = $('#document-manager-panel');

                    this._uploadArea.on("dragover", this.onFileDragOver.bind(this));
                    this._uploadArea.on("dragleave", this.onFileDragLeave.bind(this));
                    this._uploadArea.on("drop", this.onFileDrop.bind(this));
                    this.updateDocumentList();
                };

                DocumentManagerPanel.prototype.onremove = function () {
                };

                DocumentManagerPanel.prototype.view = function () {
                    return $(Handlebars.templates['document-manager-panel']());
                };

                DocumentManagerPanel.prototype.updateDocumentList = function () {
                    var _this = this;
                    this._panel.find('.uploaded-file').remove();

                    MyCalendar.documentsRepository.find({}).done(function (documents) {
                        documents.forEach(function (document) {
                            var params = document;

                            if (document.type == 'image%2Fjpeg' || document.type == 'image%2Fpng') {
                                params.picture_path = '/api/documents/download/' + document.getRefId();
                            }

                            params.document_path = '/api/documents/download/' + document.getRefId();

                            var documentItem = $(Handlebars.templates['document-item'](params));
                            _this._panel.append(documentItem);

                            documentItem.find('.delete-document').click(function () {
                                MyCalendar.documentsRepository.deleteById(document.getRefId()).done(function () {
                                    _this.updateDocumentList();
                                });
                            });

                            documentItem.find('.file-title').children().on('input', function () {
                                MyCalendar.documentsRepository.update(document.getRefId(), { name: documentItem.find('.file-title').children().first().val() });
                            });
                        });
                    });
                };

                DocumentManagerPanel.prototype.onFileDragOver = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._uploadArea.addClass('drag-over');
                };

                DocumentManagerPanel.prototype.onFileDragLeave = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._uploadArea.removeClass('drag-over');
                };

                DocumentManagerPanel.prototype.onFileDrop = function (event) {
                    var _this = this;
                    event.preventDefault();
                    event.stopPropagation();
                    this._uploadArea.removeClass('drag-over');

                    var files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;

                    if (!files) {
                        return;
                    }

                    var xhr = new XMLHttpRequest();

                    if (xhr.upload) {
                        for (var i = 0; i < files.length; ++i) {
                            if (files[i].size < DocumentManagerPanel.DOCUMENT_MAX_SIZE) {
                                var uploadingItem = $(Handlebars.templates['document-item-upload']({ name: files[i].name }));
                                uploadingItem.insertAfter(this._panel.children().first());

                                xhr.upload.addEventListener('progress', function (ev) {
                                    var pc = 100 - (ev.loaded / ev.total * 100);

                                    if (pc > 0) {
                                        uploadingItem.find('.uploading-progress').css('width', pc + '%');
                                    }
                                });

                                xhr.onreadystatechange = function (ev) {
                                    if (xhr.readyState == 4) {
                                        if (xhr.status == 200) {
                                            uploadingItem.remove();
                                            _this.updateDocumentList();
                                        } else {
                                            uploadingItem.css('background-color', 'red');
                                            uploadingItem.find('.uploading-progress').css('red');
                                        }
                                    }
                                };

                                xhr.open('POST', MyCalendar.Repository.ApiRoot + '/documents', true);
                                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                xhr.setRequestHeader('X-File-Name', encodeURIComponent(files[i].name));
                                xhr.setRequestHeader('X-File-Size', encodeURIComponent(files[i].size));
                                xhr.setRequestHeader('X-File-Type', encodeURIComponent(files[i].type));
                                xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                                xhr.send(files[i]);
                            }
                        }
                    }
                };

                DocumentManagerPanel.prototype.name = function () {
                    return 'Document Manager';
                };

                DocumentManagerPanel.prototype.toolbar = function () {
                    return new MyCalendar.UI.Toolbars.DocumentManagerToolbar();
                };

                DocumentManagerPanel.prototype.searchEnable = function () {
                    return false;
                };

                DocumentManagerPanel.prototype.onSearch = function (query) {
                    // TODO!
                };
                DocumentManagerPanel.DOCUMENT_MAX_SIZE = 20971520;
                return DocumentManagerPanel;
            })();
            Panels.DocumentManagerPanel = DocumentManagerPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="./itoolbar.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        (function (Toolbars) {
            /**
            * Interface that every toolbar should implements.
            */
            var CalendarManagerToolbar = (function () {
                function CalendarManagerToolbar() {
                }
                CalendarManagerToolbar.prototype.onload = function () {
                    // Empty now.
                };

                CalendarManagerToolbar.prototype.onremove = function () {
                };

                CalendarManagerToolbar.prototype.view = function () {
                    return $(Handlebars.templates['calendar-manager-panel-toolbar']());
                };
                return CalendarManagerToolbar;
            })();
            Toolbars.CalendarManagerToolbar = CalendarManagerToolbar;
        })(UI.Toolbars || (UI.Toolbars = {}));
        var Toolbars = UI.Toolbars;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="./itoolbar.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        (function (Toolbars) {
            /**
            * Interface that every toolbar should implements.
            */
            var ItemManagerToolbar = (function () {
                function ItemManagerToolbar() {
                }
                ItemManagerToolbar.prototype.onload = function () {
                    $("#calendar-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().popPanel();
                    });
                };

                ItemManagerToolbar.prototype.onremove = function () {
                };

                ItemManagerToolbar.prototype.view = function () {
                    return $(Handlebars.templates['item-manager-panel-toolbar']());
                };
                return ItemManagerToolbar;
            })();
            Toolbars.ItemManagerToolbar = ItemManagerToolbar;
        })(UI.Toolbars || (UI.Toolbars = {}));
        var Toolbars = UI.Toolbars;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/jqueryui.d.ts"/>
/// <reference path="../../definitions/fullCalendar.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/item-manager-toolbar.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        (function (Panels) {
            var ItemManagerPanel = (function () {
                function ItemManagerPanel() {
                }
                ItemManagerPanel.prototype.onload = function () {
                    // click function for the 'Save' button
                    $(".save-button").click(function () {
                        var event = new MyCalendar.Models.Event();
                        event.name = $('#title').val();
                        event.description = $('#description').val();
                        event.location = $('#location').val();

                        //var begin = $("#fromDate").datepicker("getDate").getDate();
                        //event.begin = begin;
                        //var end = $("#toDate").datepicker("getDate");
                        //event.end = end;
                        var calendarName = $('calendar').val();
                        var calendar = 9;

                        //show previous panel
                        MyCalendar.UI.PanelHost.getInstance().popPanel;
                    });

                    //click function for the 'calendar' button
                    $("#calendar-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().popPanel;
                    });

                    //click function for datepicker
                    $('.datepicker').datepicker({
                        beforeShow: function (input, inst) {
                            // Handle calendar position before showing it.
                            // It's not supported by Datepicker itself (for now) so we need to use its internal variables.
                            var calendar = inst.dpDiv;

                            // Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
                            setTimeout(function () {
                                calendar.position({
                                    my: 'left top',
                                    at: 'right top',
                                    collision: 'none'
                                });
                            }, 1);
                        }
                    });
                };

                ItemManagerPanel.prototype.onremove = function () {
                };

                ItemManagerPanel.prototype.view = function () {
                    return $(Handlebars.templates['item-manager-panel']());
                };

                ItemManagerPanel.prototype.name = function () {
                    return 'Item Manager';
                };

                ItemManagerPanel.prototype.toolbar = function () {
                    return new MyCalendar.UI.Toolbars.ItemManagerToolbar();
                };

                ItemManagerPanel.prototype.searchEnable = function () {
                    return false;
                };

                ItemManagerPanel.prototype.onSearch = function (query) {
                    // TODO!
                };
                return ItemManagerPanel;
            })();
            Panels.ItemManagerPanel = ItemManagerPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../../definitions/jquery.d.ts"/>
/// <reference path="../../definitions/fullCalendar.d.ts"/>
/// <reference path="../../definitions/handlebars.d.ts"/>
/// <reference path="../../repository.ts"/>
/// <reference path="./ipanel.ts"/>
/// <reference path="../toolbars/calendar-manager-toolbar.ts"/>
/// <reference path="./item-manager.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        (function (Panels) {
            var CalendarManagerPanel = (function () {
                function CalendarManagerPanel() {
                }
                CalendarManagerPanel.prototype.onload = function () {
                    // get calendar ID's from user?
                    var calendarIDs = [];
                    var calendarEvents = [];

                    for (var i = 0; i < calendarIDs.length; i++) {
                        MyCalendar.calendarsRepository.findById(calendarIDs[i]).done(function (calendar) {
                            var eventRefs = calendar.events;
                            for (var j = 0; j < eventRefs.length; j++) {
                                var dbEvent = eventRefs[j].deference();
                                var calendarEvent = { title: dbEvent.name, start: dbEvent.begin, end: dbEvent.end, description: dbEvent.description, location: dbEvent.location, documents: dbEvent.documents };
                                calendarEvents[calendarEvents.length] = calendarEvent;
                            }
                        });
                    }

                    $('#calendar').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        editable: true,
                        events: calendarEvents
                    });

                    $("#add-button").click(function () {
                        MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.ItemManagerPanel());
                    });
                };

                CalendarManagerPanel.prototype.onremove = function () {
                };

                CalendarManagerPanel.prototype.view = function () {
                    return $(Handlebars.templates['calendar-manager-panel']());
                };

                CalendarManagerPanel.prototype.name = function () {
                    return 'Calendar Manager';
                };

                CalendarManagerPanel.prototype.toolbar = function () {
                    return new MyCalendar.UI.Toolbars.CalendarManagerToolbar();
                };

                CalendarManagerPanel.prototype.searchEnable = function () {
                    return false;
                };

                CalendarManagerPanel.prototype.onSearch = function (query) {
                    // TODO!
                };
                return CalendarManagerPanel;
            })();
            Panels.CalendarManagerPanel = CalendarManagerPanel;
        })(UI.Panels || (UI.Panels = {}));
        var Panels = UI.Panels;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./idynamic-view.ts"/>
/// <reference path="../definitions/handlebars.d.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        var BreadcrumbButton = (function () {
            function BreadcrumbButton(_name) {
                this._name = _name;
                this._view = $(Handlebars.templates['breadcrumb-button']({ title: this._name }));
            }
            BreadcrumbButton.prototype.onload = function () {
            };

            BreadcrumbButton.prototype.onremove = function () {
            };

            BreadcrumbButton.prototype.select = function (value) {
                if (value) {
                    this._view.children().attr('selected', value);
                } else {
                    this._view.children().removeAttr('selected');
                }
            };

            BreadcrumbButton.prototype.view = function () {
                return this._view;
            };
            return BreadcrumbButton;
        })();
        UI.BreadcrumbButton = BreadcrumbButton;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./breadcrumb-button.ts"/>
/// <reference path="./panels/ipanel.ts"/>
/// <refenrece path="./panel-host.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        var Breacrumb = (function () {
            function Breacrumb() {
                if (Breacrumb._instance) {
                    throw 'This class is a singleton and should be accessed by the getInstance method';
                }

                this._ul = $('#breadcrumb');
                this._buttons = new Array();
            }
            /**
            * Get the instance of this PanelHost.
            *
            * @Return the instance of this PanelHost.
            */
            Breacrumb.getInstance = function () {
                if (Breacrumb._instance === null) {
                    Breacrumb._instance = new Breacrumb();
                }

                return Breacrumb._instance;
            };

            Breacrumb.prototype.addPanel = function (newPanel) {
                var newButton = new MyCalendar.UI.BreadcrumbButton(newPanel.name());
                this._buttons.push(newButton);

                this.redraw();
            };

            Breacrumb.prototype.selectedButton = function (index) {
                this._buttons = this._buttons.slice(0, index + 1);

                MyCalendar.UI.PanelHost.getInstance().changePanel(index);

                this.redraw();
            };

            Breacrumb.prototype.redraw = function () {
                var _this = this;
                this._ul.empty();

                this._buttons.forEach(function (value, index, array) {
                    _this._ul.append(value.view());

                    if (index == _this._buttons.length - 1) {
                        value.select(true);
                    } else {
                        value.select(false);
                        value.view().click(function () {
                            _this.selectedButton(index);
                        });
                    }
                });
            };
            Breacrumb._instance = null;
            return Breacrumb;
        })();
        UI.Breacrumb = Breacrumb;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./panels/ipanel.ts"/>
/// <reference path="./toolbars/itoolbar.ts"/>
/// <reference path="./breadcrumb.ts"/>
var MyCalendar;
(function (MyCalendar) {
    (function (UI) {
        var PanelHost = (function () {
            function PanelHost() {
                if (PanelHost._instance) {
                    throw 'This class is a singleton and should be accessed by the getInstance method';
                }

                this._div = $('#panel-host');
                this._toolbar = $('#toolbar');
                this._searchBar = $('#main-search-bar');

                this._panel = new Array();

                PanelHost._instance = this;
            }
            /**
            * Get the instance of this PanelHost.
            *
            * @Return the instance of this PanelHost.
            */
            PanelHost.getInstance = function () {
                if (PanelHost._instance === null) {
                    PanelHost._instance = new PanelHost();
                }

                return PanelHost._instance;
            };

            PanelHost.prototype.pushPanel = function (newPanel, callback) {
                var _this = this;
                if (this._panel.length > 1) {
                    this._panel[this._panel.length - 1].onremove();
                }

                var showPannel = function () {
                    _this._div.empty();
                    _this._panel.push(newPanel);

                    var view = newPanel.view();

                    _this._div.append(view);
                    MyCalendar.UI.Breacrumb.getInstance().addPanel(newPanel);

                    view.hide().fadeIn(400, function () {
                        _this.setupToolbar(newPanel);
                        _this.setupSearch(newPanel);

                        newPanel.onload();
                        if (callback) {
                            callback();
                        }
                    });
                };

                if (this._div.children().length > 1) {
                    this._div.children().fadeOut(400, showPannel());
                } else {
                    showPannel();
                }
            };

            PanelHost.prototype.popPanel = function (callback) {
                var _this = this;
                if (this._panel.length < 1) {
                    return null;
                }

                this._panel[this._panel.length - 1].onremove();

                var result = this._panel.pop();
                this._div.children().fadeOut(400, function () {
                    _this._div.empty();
                    if (_this._panel.length > 1) {
                        var newPanel = _this._panel[_this._panel.length - 1];

                        var view = newPanel.view();

                        _this._div.append(view);
                        view.hide().fadeIn(400, function () {
                            _this.setupToolbar(newPanel);
                            _this.setupSearch(newPanel);

                            _this._panel[_this._panel.length - 1].onload();

                            if (callback) {
                                callback(result);
                            }
                        });
                    }
                });
            };

            PanelHost.prototype.changePanel = function (index, callback) {
                var _this = this;
                var result = this._panel[this._panel.length - 1];

                result.onremove();

                this._div.children().fadeOut(400, function () {
                    _this._div.empty();

                    _this._panel = _this._panel.slice(0, index + 1);

                    var newPanel = _this._panel[index];
                    var view = newPanel.view();
                    _this._div.append(view);
                    view.hide().fadeIn(400, function () {
                        _this.setupToolbar(newPanel);
                        _this.setupSearch(newPanel);

                        newPanel.onload();

                        if (callback) {
                            callback(result);
                        }
                    });
                });
            };

            PanelHost.prototype.setupToolbar = function (panel) {
                this._toolbar.empty();

                if (panel.toolbar() !== null) {
                    this._toolbar.append(panel.toolbar().view());
                }
            };

            PanelHost.prototype.setupSearch = function (panel) {
                var _this = this;
                if (panel.searchEnable()) {
                    this._searchBar.prop('disabled', false);

                    // Bind the input event.
                    this._searchBar.on('input', function () {
                        panel.onSearch(_this._searchBar.val());
                    });
                } else {
                    this._searchBar.prop('disabled', true);
                }
            };
            PanelHost._instance = null;
            return PanelHost;
        })();
        UI.PanelHost = PanelHost;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
/// <reference path="./definitions/jquery.d.ts"/>
/// <reference path="./repository.ts"/>
/// <reference path="./definitions/jqueryui.d.ts"/>
/// <reference path="./definitions/fullCalendar.d.ts"/>
/// <reference path="./ui/panels/document-manager.ts"/>
/// <reference path="./ui/panels/calendar-manager.ts"/>
/// <reference path="./ui/panel-host.ts"/>
// Start the script when the page is ready.
$(function () {
    var userButton = $('#user-settings-button');
    var mainMenu = $('#main-menu');

    // open and close the account-menu
    userButton.click(function (event) {
        var state = userButton.attr('selected');

        if (typeof state === 'undefined' || (state) === false) {
            userButton.attr('selected', true);
            mainMenu.show().animate({ width: 240 }, 200, function () {
                mainMenu.children('.hidable-menu').show();
            });
            $('body').width($('body').width() - 100);
        } else {
            mainMenu.children('.hidable-menu').hide();
            mainMenu.show().animate({ width: 80 }, 200, function () {
                userButton.removeAttr('selected');
            });
            $('body').width($('body').width() + 100);
        }

        console.log("type: ");
    });

    // Database tests!
    MyCalendar.calendarsRepository.create({ name: 'test', events: [] }).done(function (myCalendar) {
        console.log(myCalendar.getRefId());
        myCalendar.name = 'yo';
        MyCalendar.calendarsRepository.save(myCalendar).done(function () {
            MyCalendar.calendarsRepository.findById(myCalendar.getRefId()).done(function (myCalendar2) {
                console.log(myCalendar2.name);
            });
        });

        MyCalendar.calendarsRepository.find({}).done(function (calendars) {
            calendars.map(function (value, index, array) {
                console.log(value.getRefId());
                MyCalendar.calendarsRepository.delete(value);
            });
        });

        MyCalendar.calendarsRepository.find({}).done(function (calendars) {
            calendars.map(function (value, index, array) {
                console.log(value.getRefId());
            });
        });

        var event = new MyCalendar.Models.Event();
        event.name = 'test';
        event.description = 'test';
        event.location = 'test';
        event.begin = new Date(2014, 1, 1);
        event.end = new Date(2014, 1, 2);
        event.documents = [];

        MyCalendar.eventsRepository.save(event).done(function (event) {
            var calendar = new MyCalendar.Models.Calendar();

            calendar.name = 'test';
            calendar.events = [new MyCalendar.Models.Ref(event.getRefId(), MyCalendar.eventsRepository)];

            MyCalendar.calendarsRepository.save(calendar).done(function (calendar) {
                console.log('saved!');
            });
        });
    });

    MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel(), function () {
        MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel(), function () {
            MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.DocumentManagerPanel());
        });
    });
    // MyCalendar.UI.PanelHost.getInstance().pushPanel(new MyCalendar.UI.Panels.CalendarManagerPanel());
});
//# sourceMappingURL=mycalendar.js.map
