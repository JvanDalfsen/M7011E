/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="./breadcrumb-button.ts"/>
/// <reference path="./panels/ipanel.ts"/>
/// <refenrece path="./panel-host.ts"/>

module MyCalendar.UI {
    export class Breacrumb {
        private _ul: JQuery;
        private _buttons: Array<BreadcrumbButton>;

        /**
         * Singleton instance.
         */
        private static _instance: Breacrumb = null;

        constructor() {
            if (Breacrumb._instance) {
                throw 'This class is a singleton and should be accessed by the getInstance method';
            }

            this._ul = $('#breadcrumb');
            this._buttons = new Array<BreadcrumbButton>();
        }

        /**
         * Get the instance of this PanelHost.
         *
         * @Return the instance of this PanelHost. 
         */
        public static getInstance(): Breacrumb {
            if (Breacrumb._instance === null) {
                Breacrumb._instance = new Breacrumb();
            }

            return Breacrumb._instance;
        }

        public addPanel(newPanel: Panels.IPanel): void {
            var newButton = new BreadcrumbButton(newPanel.name());
            this._buttons.push(newButton);

            this.redraw();
        }

        private selectedButton(index: number): void {
            this._buttons = this._buttons.slice(0, index + 1);

            PanelHost.getInstance().changePanel(index);

            this.redraw();
        }

        private redraw(): void {
            this._ul.empty();

            this._buttons.forEach((value: UI.BreadcrumbButton, index: number, array: UI.BreadcrumbButton[]) => {
                this._ul.append(value.view());

                if (index == this._buttons.length - 1) {
                    value.select(true);
                } else {
                    value.select(false);
                    value.view().click(() => {
                        this.selectedButton(index);
                    });
                }
            });
        }
    }
}