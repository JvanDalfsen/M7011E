var MyCalendar;
(function (MyCalendar) {
    /// <reference path="../definitions/jquery.d.ts"/>
    /// <reference path="./breadcrumb-button.ts"/>
    /// <reference path="./panels/ipanel.ts"/>
    /// <refenrece path="./panel-host.ts"/>
    (function (UI) {
        var Breacrumb = (function () {
            function Breacrumb() {
                if (Breacrumb._instance) {
                    throw 'This class is a singleton and should be accessed by the getInstance method';
                }

                this._ul = $('#breadcrumb');
                this._buttons = new Array();
            }
            Breacrumb.getInstance = /**
            * Get the instance of this PanelHost.
            *
            * @Return the instance of this PanelHost.
            */
            function () {
                if (Breacrumb._instance === null) {
                    Breacrumb._instance = new Breacrumb();
                }

                return Breacrumb._instance;
            };

            Breacrumb.prototype.addPanel = function (newPanel) {
                var newButton = new UI.BreadcrumbButton(newPanel.name());
                this._buttons.push(newButton);

                this.redraw();
            };

            Breacrumb.prototype.selectedButton = function (index) {
                this._buttons = this._buttons.slice(0, index + 1);

                UI.PanelHost.getInstance().changePanel(index);

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
