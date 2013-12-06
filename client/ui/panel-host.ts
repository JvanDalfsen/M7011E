/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./panels/ipanel.ts"/>
/// <reference path="./toolbars/itoolbar.ts"/>

module MyCalendar.UI {
    export class PanelHost {
        private _div:       JQuery;
        private _toolbar:   JQuery;
        private _searchBar: JQuery;

        private _panel: Array<Panels.IPanel>;

        /**
         * Singleton instance.
         */
        private static _instance: PanelHost = null;
        

        constructor() {
            if (PanelHost._instance) {
                throw 'This class is a singleton and should be accessed by the getInstance method';
            }

            this._div       = $('#panel-host');
            this._toolbar   = $('#toolbar');
            this._searchBar = $('#main-search-bar');

            this._panel = new Array<Panels.IPanel>();

            PanelHost._instance = this;
        }

        /**
         * Get the instance of this PanelHost.
         *
         * @Return the instance of this PanelHost. 
         */
        public static getInstance(): PanelHost {
            if (PanelHost._instance === null) {
                PanelHost._instance = new PanelHost();
            }

            return PanelHost._instance;
        }

        public pushPanel(newPanel: Panels.IPanel): void {
            if (this._panel.length > 1) {
                this._panel[this._panel.length - 1].onremove();
                this._div.empty();
            }

            this._panel.push(newPanel);
            this._div.append(newPanel.view());

            this.setupToolbar(newPanel);
            this.setupSearch(newPanel);

            newPanel.onload();         
        }

        public popPanel(): Panels.IPanel {
            if (this._panel.length < 1) {
                return null;
            }

            this._panel[this._panel.length - 1].onremove();
            this._div.empty();
            var result = this._panel.pop();

            if (this._panel.length > 1) {
                var newPanel = this._panel[this._panel.length - 1];
                this._div.append(newPanel.view());

                this.setupToolbar(newPanel);
                this.setupSearch(newPanel);

                this._panel[this._panel.length - 1].onload();
            }

            return result;
        }

        private setupToolbar(panel: Panels.IPanel) {
            this._toolbar.empty();

            if (panel.toolbar() !== null) {
                this._toolbar.append(panel.toolbar().view());
            }
        }

        private setupSearch(panel: Panels.IPanel) {
            if (panel.searchEnable()) {
                this._searchBar.prop('disabled', false);
                // Bind the input event.
                this._searchBar.on('input', () => {
                    panel.onSearch(this._searchBar.val());
                });
            } else {
                this._searchBar.prop('disabled', true);
            }
        }
    }
}