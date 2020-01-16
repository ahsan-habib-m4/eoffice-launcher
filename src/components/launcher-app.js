/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import '@polymer/paper-styles/typography.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { setsubmenu, removesubmenu, updateactivemenu } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
    counter
});

// These are the actions needed by this element.
import {
    navigate,
    updateOffline,
    updateDrawerState
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-ripple/paper-ripple.js';

import '@polymer/paper-badge/paper-badge.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/social-icons.js';
import 'web-animations-js/web-animations-next-lite.min.js';
import '@vaadin/vaadin-accordion/theme/material/vaadin-accordion.js';

import '@polymer/paper-material/paper-material.js';

import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@vaadin/vaadin-date-picker/theme/material/vaadin-date-picker.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-time-picker/theme/material/vaadin-time-picker.js';

import '@polymer/paper-dialog/paper-dialog.js';

import { menuIcon } from './my-icons.js';
import './snack-bar.js';

class LauncherApp extends connect(store)(LitElement) {
        static get properties() {
            return {
                appTitle: { type: String },
                _page: { type: String },
                _menu: { type: String },
                _drawerOpened: { type: Boolean },
                _snackbarOpened: { type: Boolean },
                _offline: { type: Boolean },
                menuJson: { type: Array },
                myArray: { type: Array },
                _submenu: { type: Array },
                _value: { type: Number },
                _hasSubMenu: { type: Boolean },
                _activeMenu: { type: String }
            };
        }

        static get styles() {
            return [
                css `
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

          --app-drawer-width: 256px;

          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #55BADF;
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
          z-index: 1;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Pacifico';
          text-transform: capitalize;
          font-size: 30px;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }


        .drawer-list  a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
          position: relative;
          font-size:14px;
          font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          -webkit-transition: all 100ms;
          -moz-transition: all 100ms;
            -o-transition: all 100ms;
                transition: color all 100ms;
        }

        .drawer-list a[selected], .drawer-list a:hover {
          color: var(--app-drawer-selected-color);
          font-size: 16px;
          -webkit-transition: all 100ms;
          -moz-transition: all 100ms;
            -o-transition: all 100ms;
                transition: color all 100ms;
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 64px;
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          padding: 5px 0px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }
        app-drawer {
          z-index: 1;
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
          position: relative;
        }

        :host {
          --app-primary-color: #11458f;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 00px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px 0 20px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
          border-bottom: 1px solid #e0e0e0;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
        app-toolbar#logo {
          height: 110px;
        }
        app-toolbar#logo img {
          width: 80%;
          margin: auto;
        }
        paper-material a, vaadin-accordion-panel a {
          position: relative;
        }

        app-drawer {
          box-shadow: 1px 1px 6px 1px #0000003b;
        }

        vaadin-accordion-panel {
          box-shadow:none;
        }

        vaadin-accordion-panel[opened]:not(:last-child) {
            margin-bottom: 0;
            border-bottom: 1px solid #e0e0e0;
        }

        vaadin-accordion-panel [part="summary"] {
          max-height: 40px;
        }
        
        .drawer-list vaadin-accordion-panel a {
          border-bottom: none;
        }

        paper-dialog.size-position {
          position: fixed;
          top: 20px;
          right: 30px;
        }

        paper-button.indigo {
          background-color: var(--paper-indigo-500);
          color: white;
          --paper-button-raised-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          };
        }

        nav.drawer-list {
          margin-top: 20px;
        }

        fontawesome-icon {
          display: inline-block;
          margin-right: 5px;
        }
        
        paper-menu-button {
          margin-right: 10px;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }

          .main-content {
            padding-top: 60px;
          }

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `
            ];
        }

        render() {
                // Anything that's related to rendering should be done in here.
                return html `
        <style is="custom-style">
          vaadin-accordion div[part="summary"] {
            min-height: 48px;
            padding: 0 4px;
          }
        </style>
        <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <div style="height: 100%; overflow: auto;">
            <app-toolbar id="logo">
            <a href="/card-view" @click="${this._removeSubMenu}"  style="width: auto; text-align: center; padding-top: 10px;"><img src="images/metafour.png"  /></a>
            </app-toolbar>

            <nav class="drawer-list">
             
                <a ?selected="${this._activeMenu === 'Home'}" href="/card-view" @click="${this._removeSubMenu}" ><fontawesome-icon prefix="fas" name="home"></fontawesome-icon> Home<paper-ripple>Home</paper-ripple></a>
                ${repeat(this.menuJson, item =>  html`
                  ${item.sub
                      ? html`
                        <a ?selected="${this._activeMenu === item.menu}" href="/card-view" sub-menu="${item.menu}" class="menu-link" ><fontawesome-icon prefix="fas" name="${item.logo}"></fontawesome-icon> ${item.menu}<paper-ripple>Click here</paper-ripple></a>
                      `
                      : html`
                        <a ?selected="${this._activeMenu === item.menu}" href="/listview" data-link="${item.list}" class="menu-link" menu-name="${item.menu}"><fontawesome-icon prefix="fas" name="${item.logo}"></fontawesome-icon> ${item.menu}<paper-ripple>Click here</paper-ripple></a>
                      `
                  }
                `)}
                <a ?selected="${this._page === 'chart'}" class="menu-link" href="/chart"><fontawesome-icon prefix="fas" name="chart-pie"></fontawesome-icon> Chart<paper-ripple>Click here</paper-ripple></a>
                <a ?selected="${this._page === 'form'}" class="menu-link" href="/form"><fontawesome-icon prefix="fas" name="search"></fontawesome-icon> Search<paper-ripple>Click here</paper-ripple></a>
            <!--
                <vaadin-accordion opened="null">
                  <vaadin-accordion-panel theme="filled">
                    <div slot="summary">Bookings</div>
                    <div>
                    <a ?selected="${this._page === 'view2'}" href="/view2">All Bookings<paper-ripple>Click here</paper-ripple></a>
                    </div>
                  </vaadin-accordion-panel>
                  <vaadin-accordion-panel theme="filled">
                    <div slot="summary">Components</div>
                    <a ?selected="${this._page === 'view3'}" href="/view3">Accommodation<paper-ripple>Click here</paper-ripple></a>
                  </vaadin-accordion-panel>
                </vaadin-accordion> -->
          
            </nav>
          </div>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="menu" drawer-toggle="">${menuIcon}</paper-icon-button>
              <div main-title="">  
              </div>
              <paper-icon-button icon="search" id="searchbtn"></paper-icon-button>
              <paper-menu-button horizontal-align="right">
                <paper-icon-button icon="info" id="btn" slot="dropdown-trigger"></paper-icon-button>
                <paper-listbox slot="dropdown-content">
                  <paper-item>Share</paper-item>
                  <paper-item>Settings</paper-item>
                  <paper-item>Help</paper-item>
                </paper-listbox>
              </paper-menu-button>
              <paper-badge for="btn" label="1"></paper-badg>
            </app-toolbar>
          </app-header>

          <!-- Main content -->
          <main role="main" class="main-content">
            <card-view class="page" ?active="${this._page === 'card-view'}"></card-view>
            <chart-view class="page" ?active="${this._page === 'chart'}"></chart-view>
            <list-view class="page" ?active="${this._page === 'listview'}"></list-view>
            <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
            <form-view class="page" ?active="${this._page === 'form'}"></form-view>
            <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
          </main>

          <paper-dialog id="dialog" class="size-position">
            <iron-form id="form1">
              <form action="/" method="get">
                <paper-input type="text" name="name" required label="Name" value=""></paper-input>
                <div class="input-group">
                  <paper-radio-group selected="male">
                    <paper-radio-button name="male">Male</paper-radio-button>
                    <paper-radio-button name="female">Female</paper-radio-button>
                  </paper-radio-group>
                </div>
                <div class="input-group">
                <paper-dropdown-menu label="Size" name="dropdown">
                  <paper-listbox slot="dropdown-content" selected="1">
                    <paper-item>Small</paper-item>
                    <paper-item>Medium</paper-item>
                    <paper-item>Large</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>   
                </div>      
                <div class="input-group">       
                  <label for="">Range</label>
                  <paper-slider class="blue" value="183" max="255" secondary-progress="200" pin name="range"> </paper-slider>
                </div>
                <div class="input-group">
                  <paper-toggle-button checked></paper-toggle-button>
                </div>
                <div class="input-group">
                  <vaadin-date-picker label="Date" placeholder="Date of Birth" name="date" required></vaadin-date-picker>
                </div>
                <div class="input-group">
                  <vaadin-time-picker label="Delivery Time" name="time"></vaadin-time-picker>
                </div>
                <div class="input-group">
                  <paper-checkbox name="all" value="all" checked>All</paper-checkbox><br>
                </div>
                <br>
                <br>
                <paper-button class="sbmt-btn indigo" raised  @click="${this._submitForm}">Submit</paper-button>
              </form>
            </iron-form>
          </paper-dialog>
          <div id="output"></div>
        <footer>
          <p>Made with &hearts; by the Metafour team.</p>
        </footer>

        <snack-bar ?active="${this._snackbarOpened}">
          You are now ${this._offline ? 'offline' : 'online'}.
        </snack-bar>
        </app-header-layout>
      </app-drawer-layout>
      `;
    }

    constructor() {
        super();
        // To force all event listeners for gestures to be passive.
        // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
        setPassiveTouchGestures(true);

        fetch('data/menu_fairlight.json')
            .then(response => response.json())
            .then(json => {
                this.menuJson = json;
                console.log(this.menuJson);
            });
    }

    firstUpdated() {
        installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
        installMediaQueryWatcher(`(min-width: 460px)`,
            () => store.dispatch(updateDrawerState(false)));

        const searchbtn = this.shadowRoot.getElementById('searchbtn');
        const dialog = this.shadowRoot.getElementById('dialog');
        searchbtn.addEventListener('click', function(element) {
            console.log(element);
            //  dialog. = element;
            dialog.open();

        });

        const output = this.shadowRoot.getElementById('output');
        const form = this.shadowRoot.querySelector('iron-form');
        console.log(output);
        form.addEventListener('iron-form-submit', function(event) {
            alert(JSON.stringify(event.detail));
            // output.innerHTML = JSON.stringify(event.detail);
            form.reset();
            dialog.close();
        });
    }

    updated(changedProps) {
        if (changedProps.has('_page') || changedProps.has('_activeMenu')) {
            const pageTitle = this.appTitle + ' - ' + this._page + ' - ' + this._activeMenu;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                    // This object also takes an image property, that points to an img src.
            });
        }
    }

    _menuButtonClicked() {
        store.dispatch(updateDrawerState(true));
    }

    _drawerOpenedChanged(e) {
        store.dispatch(updateDrawerState(e.target.opened));
    }

    _submitForm() {
        this.shadowRoot.querySelector('iron-form').submit();
    }

    _newPage(e){
      console.log(e.target.id.replace(/\s/g,''));
      this._menu = e.target.id;
     // alert(this._menu);
    }

    _removeSubMenu(){
      store.dispatch(removesubmenu());
    }

    updated(changedProperties) {
      console.log("updated")
      this.addEventListenerToLinks();
    }

    addEventListenerToLinks(){
      console.log("firstUpdated called");
      const menus = this.shadowRoot.querySelectorAll('a.menu-link');
      var mainmenu = this.menuJson;
    //  console.log(mainmenu);
      var filterObj;
      menus.forEach(function(menu){
        menu.addEventListener("click", function() {
          var hassubmenu = this.getAttribute("sub-menu");
          
          if(hassubmenu) {

            filterObj = mainmenu.filter(function(obj) {
              return obj.menu == hassubmenu;
            });
            
            if(filterObj[0].hasOwnProperty('sub')){
              this._submenu = filterObj[0].sub;
              store.dispatch(setsubmenu(this._submenu,filterObj[0].menu));
            } else {
              this._dataurl = filterObj[0].list;
            }
            
          } else {
            this._dataurl = this.getAttribute("data-link");
            var menuname = this.getAttribute("menu-name");
            console.log(this._dataurl);
            store.dispatch(updateactivemenu(menuname));
          }


        });
      });
    }
    
    stateChanged(state) {
        this._page = state.app.page;
        this._offline = state.app.offline;
        this._snackbarOpened = state.app.snackbarOpened;
        this._drawerOpened = state.app.drawerOpened;
        this._submenu = state.counter.submenu;
        this._value = state.counter.value;
        this._hasSubMenu = state.counter.hasSubMenu;
        this._activeMenu = state.counter.activeMenu;
    }
}

window.customElements.define('launcher-app', LauncherApp);