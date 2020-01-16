/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import 'fontawesome-icon';
import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { PageViewElement } from './page-view-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { setsubmenu, removesubmenu, updateactivemenu } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
    counter
});

import '@google-web-components/google-chart/google-chart.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-button/paper-button.js'
import '@vaadin/vaadin-notification/vaadin-notification.js';
import '@polymer/paper-card/paper-card.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class Dashboard extends connect(store)(PageViewElement) {

        static get properties() {
            return {
                menuJson: { type: Array },
                submenu: { type: Array, notify: true },
                _submenu: { type: Array },
                _value: { type: Number },
                _hasSubMenu: { type: Boolean },
                __dataurl: { type: String }
            };
        }
        static get styles() {
            return [
                SharedStyles
            ];
        }

        render() {
                return html `
         <style include="shared-styles">
        :host {
          display: block;

          padding: 40px 20px;
        }
        .chart-div-col{
          float: left;
          margin-right:2em;
          margin-bottom:2em;
        }
        paper-fab {
          position: fixed;
          right: 50px;
          bottom: 50px;
        }
        .sec-card {
          position: relative;
        }
        .sec-card a {
            color: #000;
            text-decoration: none;
        }
        .sec-card  {
          padding: 10px;
          text-align: center;
          width: 14%;
          min-width: 198px;
          margin: 0px 10px 10px 0px;
        }
        .sec-card fontawesome-icon {
            font-size: 40px;
            color: #0C2230;
            -webkit-transition: all 100ms;
          -moz-transition: all 100ms;
            -o-transition: all 100ms;
                transition: color all 100ms;
        }
        .sec-card p {
          margin: 0;
        }
        .sec-card p:last-child {
            color: #3c353e;
            font-size: 12px;
            text-transform: capitalize;
        }
        .sec-card p:last-child {
            color: #0C2230;
        }
        .sec-card a.menu-link:hover fontawesome-icon, .sec-card a.menu-link:hover {
          color: var(--app-drawer-selected-color);
          -webkit-transition: all 100ms;
          -moz-transition: all 100ms;
            -o-transition: all 100ms;
                transition: color all 100ms;
        }
      </style>
      
      ${this._hasSubMenu
          ? html`
            ${repeat(this._submenu, item =>  html`
              <paper-card class="sec-card">
                ${item.sub
                    ? html`
                      <a ?selected="${this._menu === '${item.menu}'}" href="/dashboard" sub-menu="${item.menu}" class="menu-link" >
                      <fontawesome-icon prefix="fas" name="${item.logo}" fixed-width></fontawesome-icon>
                      <p>${item.menu}</p>
                      <p>${item.note}</p>
                      </a>
                    `
                    : html`
                      <a ?selected="${this._menu === '${item.menu}'}" href="/view2" data-link="${item.list}" class="menu-link" menu-name="${item.menu}">
                        <fontawesome-icon prefix="fas" name="${item.logo}" fixed-width></fontawesome-icon>
                        <p>${item.menu}</p>
                        <p>${item.note}</p>
                      </a>
                    `
                }
                      
                      <paper-ripple>Click here</paper-ripple>
              </paper-card>
            `)} 
          `
          : html`

            ${repeat(this.menuJson, item =>  html`
              <paper-card class="sec-card">
                ${item.sub
                    ? html`
                      <a ?selected="${this._menu === '${item.menu}'}" href="/dashboard" sub-menu="${item.menu}" class="menu-link" >
                      <fontawesome-icon prefix="fas" name="${item.logo}"></fontawesome-icon>
                      <p>${item.menu}</p>
                      <p>${item.note}</p>
                      </a>
                    `
                    : html`
                      <a ?selected="${this._menu === '${item.menu}'}" href="/view2" data-link="${item.list}"class="menu-link" menu-name="${item.menu}">
                        <fontawesome-icon prefix="fas" name="${item.logo}"></fontawesome-icon>
                        <p>${item.menu}</p>
                        <p>${item.note}</p>
                      </a>
                    `
                }
                      
                      <paper-ripple>Click here</paper-ripple>
              </paper-card>
            `)}
          
          `
      } 
      <paper-fab icon="add" title="add" id="fabbtn"></paper-fab>
      <vaadin-notification duration="4000" position="bottom-start">test</vaadin-notification>
    `;
    }

    constructor() {
        super();
        fetch('data/menu_fairlight.json')
            .then(response => response.json())
            .then(json => {
                this.menuJson = json;
              //  console.log(this.menuJson);
            });
         //   this.submenu = [1,2,3];   
    }

    handleClick(e) {
      console.log(e.target);
    }

    connectedCallback() {
      super.connectedCallback();
      
    }

    firstUpdated() {

      const btn = this.shadowRoot.querySelector('paper-fab');
      const notification = this.shadowRoot.querySelector('vaadin-notification');
      btn.addEventListener('click', function() {
          notification.open();
      });

      notification.renderer = function(root) {
          // Check if there is a content generated with the previous renderer call not to recreate it.
          if (root.firstElementChild) {
              return;
          }

          const container = window.document.createElement('div');
          const boldText = window.document.createElement('b');
          boldText.textContent = 'Notice';

          const br = window.document.createElement('br');
          const plainText = window.document.createTextNode('The notification has HTML content');

          const retryBtn = window.document.createElement('paper-button');
          retryBtn.textContent = 'close'
          container.appendChild(boldText);
          container.appendChild(br);
          container.appendChild(plainText);
          container.appendChild(retryBtn);


          root.appendChild(container);

          retryBtn.addEventListener('click', function() {
              notification.close();
          });
      };
      notification.open();
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
            console.log(menuname);
            store.dispatch(updateactivemenu(menuname));
          }


        });
      });
    }

    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);

      console.log('attribute change test: ', name, newval);
    }

    stateChanged(state) {
      this._submenu = state.counter.submenu;
      this._value = state.counter.value;
      this._hasSubMenu = state.counter.hasSubMenu;
      this._activeMenu = state.counter.activeMenu;
  }
}

window.customElements.define('dash-board', Dashboard);