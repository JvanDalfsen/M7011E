/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./panels/ipanel.ts"/>
/// <reference path="./toolbars/itoolbar.ts"/>

module MyCalendar.UI {
    export class PanelHost {
        private _div: JQuery;
        private _panel: Array<Panels.IPanel>;
        

        constructor() {
            this._div = $('#panel-host');
            this._panel = new Array<Panels.IPanel>();
        }

        public pushPanel(newPanel: Panels.IPanel): void {
            if (this._panel.length > 1) {
                this._panel[this._panel.length - 1].onremove();
                this._div.empty();
            }

            this._panel.push(newPanel);
            this._div.append(newPanel.view());
            newPanel.onload();
            //TODO: Update the toolbar.
        }

        public popPanel(): Panels.IPanel {
            if (this._panel.length < 1) {
                return null;
            }

            this._panel[this._panel.length - 1].onremove();
            this._div.empty();
            var result = this._panel.pop();

            if (this._panel.length > 1) {
                this._div.append(this._panel[this._panel.length - 1].view());
                this._panel[this._panel.length - 1].onload();
            }

            return result;
        }
    }
}