var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/jquery.d.ts"/>
    /// <reference path="./panels/ipanel.ts"/>
    /// <reference path="./toolbars/itoolbar.ts"/>
    /// <reference path="./breadcrumb.ts"/>
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
            PanelHost.getInstance = /**
            * Get the instance of this PanelHost.
            *
            * @Return the instance of this PanelHost.
            */
            function () {
                if (PanelHost._instance === null) {
                    PanelHost._instance = new PanelHost();
                }

                return PanelHost._instance;
            };

            PanelHost.prototype.pushPanel = function (newPanel, callback) {
                if (this._panel.length > 1) {
                    this._panel[this._panel.length - 1].onremove();
                }

                var showPannel = function () {
                    _this._div.empty();
                    _this._panel.push(newPanel);

                    var view = newPanel.view();

                    _this._div.append(view);
                    UI.Breacrumb.getInstance().addPanel(newPanel);

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
                MyCalendar.UI.Breacrumb.getInstance().popPanel();

                this._div.children().fadeOut(400, function () {
                    _this._div.empty();
                    if (_this._panel.length > 0) {
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
                this._searchBar.val('');

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
