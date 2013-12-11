/// <reference path="../definitions/jquery.d.ts"/>
/// <reference path="../models/user.ts"/>
/// <reference path="../definitions/handlebars.d.ts"/>
/// <reference  path="panels/document-manager.ts"/>
/// <reference  path="./panel-host.ts"/>

module MyCalendar.UI {
    export class UserMenu {
        private _userButton: JQuery; 
        private _mainMenu: JQuery;
        private _userInfo: JQuery;
        private _userConnection: JQuery;
        private _contentManagerButton: JQuery;

        /**
         * Singleton instance.
         */
        private static _instance: UserMenu = null;

        constructor() {
            if (UserMenu._instance) {
                throw 'This class is a singleton and should be accessed by the getInstance method';
            }
            
            this._mainMenu = $('#user-menu');
            this._userInfo = $('#user-infos');
            this._userConnection = $('#user-connection');
            this._contentManagerButton = $('#content-manager-button');

            this.logoutState();

            this._contentManagerButton.click(() => {
                PanelHost.getInstance().pushPanel(new Panels.DocumentManagerPanel());
            });
        }

        /**
         * Get the instance of this PanelHost.
         *
         * @Return the instance of this PanelHost. 
         */
        public static getInstance(): UserMenu {
            if (UserMenu._instance === null) {
                UserMenu._instance = new UserMenu();
            }

            return UserMenu._instance;
        }

        private attachEvent(): void {
            this._userButton = $('#user-settings-button');

            // open and close the account-menu
            this._userButton.click((event: JQueryEventObject) => {
                var state: any = this._userButton.attr('selected');

                if (typeof state === 'undefined' || <boolean>(state) === false) {
                    this.open();
                } else {
                    this.close();
                }
            });            
        }

        public logoutState(): void {
            this._userInfo.empty();
            this._userInfo.append($(Handlebars.templates['offline-user-infos']()));

            this._userConnection.empty();
            this._userConnection.append($(Handlebars.templates['offline-user-connection']()));

            this.attachEvent();
        }

        public loginState(user: Models.User) {
            this._userInfo.empty();
            this._userInfo.append($(Handlebars.templates['user-infos'](user)));

            this._userConnection.empty();
            this._userConnection.append($(Handlebars.templates['user-connection']()));

            this.attachEvent();
        }

        public open() {
            this._userButton.attr('selected', true);
            this._mainMenu.animate({ width: 240 }, 200, () => {
                $('.hidable-menu').show();
            });
            $('body').width($('body').width() - 100);
        }

        public close() {
            $('.hidable-menu').hide();
            this._mainMenu.animate({ width: 80 }, 200, () => {
                this._userButton.removeAttr('selected');
            });
            $('body').width($('body').width() + 100);
        }
    }
}