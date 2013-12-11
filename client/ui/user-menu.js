var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/jquery.d.ts"/>
    /// <reference path="../models/user.ts"/>
    /// <reference path="../definitions/handlebars.d.ts"/>
    /// <reference  path="./panels/document-manager.ts"/>
    /// <reference  path="./panels/about.ts"/>
    /// <reference  path="./panels/help.ts"/>
    /// <reference  path="./panel-host.ts"/>
    (function (UI) {
        var UserMenu = (function () {
            function UserMenu() {
                if (UserMenu._instance) {
                    throw 'This class is a singleton and should be accessed by the getInstance method';
                }

                this._mainMenu = $('#user-menu');
                this._userInfo = $('#user-infos');
                this._userConnection = $('#user-connection');
                this._contentManagerButton = $('#content-manager-button');
                this._aboutButton = $('#about-button');
                this._helpButton = $('#help-button');

                this.logoutState();

                this._contentManagerButton.click(function () {
                    UI.PanelHost.getInstance().pushPanel(new UI.Panels.DocumentManagerPanel());
                });

                this._aboutButton.click(function () {
                    UI.PanelHost.getInstance().pushPanel(new UI.Panels.AboutPanel());
                });

                this._helpButton.click(function () {
                    UI.PanelHost.getInstance().pushPanel(new UI.Panels.HelpPanel());
                });
            }
            UserMenu.getInstance = /**
            * Get the instance of this PanelHost.
            *
            * @Return the instance of this PanelHost.
            */
            function () {
                if (UserMenu._instance === null) {
                    UserMenu._instance = new UserMenu();
                }

                return UserMenu._instance;
            };

            UserMenu.prototype.attachEvent = function () {
                var _this = this;
                this._userButton = $('#user-settings-button');

                // open and close the account-menu
                this._userButton.click(function (event) {
                    var state = _this._userButton.attr('selected');

                    if (typeof state === 'undefined' || (state) === false) {
                        _this.open();
                    } else {
                        _this.close();
                    }
                });
            };

            UserMenu.prototype.logoutState = function () {
                this._userInfo.empty();
                this._userInfo.append($(Handlebars.templates['offline-user-infos']()));

                this._userConnection.empty();
                this._userConnection.append($(Handlebars.templates['offline-user-connection']()));

                this.attachEvent();
            };

            UserMenu.prototype.loginState = function (user) {
                this._userInfo.empty();
                this._userInfo.append($(Handlebars.templates['user-infos'](user)));

                this._userConnection.empty();
                this._userConnection.append($(Handlebars.templates['user-connection']()));

                this.attachEvent();
            };

            UserMenu.prototype.open = function () {
                this._userButton.attr('selected', true);
                this._mainMenu.animate({ width: 240 }, 200, function () {
                    $('.hidable-menu').show();
                });
                $('body').width($('body').width() - 100);
            };

            UserMenu.prototype.close = function () {
                var _this = this;
                $('.hidable-menu').hide();
                this._mainMenu.animate({ width: 80 }, 200, function () {
                    _this._userButton.removeAttr('selected');
                });
                $('body').width($('body').width() + 100);
            };
            UserMenu._instance = null;
            return UserMenu;
        })();
        UI.UserMenu = UserMenu;
    })(MyCalendar.UI || (MyCalendar.UI = {}));
    var UI = MyCalendar.UI;
})(MyCalendar || (MyCalendar = {}));
