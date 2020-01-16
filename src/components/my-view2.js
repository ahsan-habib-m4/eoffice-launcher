/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { increment, decrement } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
    counter
});

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// These are the elements needed for datatable
import '@vaadin/vaadin-grid/theme/material/vaadin-grid.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-filter-column.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import '@vaadin/vaadin-split-layout/vaadin-split-layout.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-card/paper-card.js';

class MyView2 extends connect(store)(PageViewElement) {
    static get properties() {
        return {
            // This is the data from the store.
            _clicks: { type: Number },
            _value: { type: Number },
            _page: { type: String },
            _menu: { type: String },
            key: { type: String }
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
            text-transform: capitalize;
            padding: 10px;
          }
          .chart-div-col{
            float: left;
            margin-right:2em;
            margin-bottom:2em;
          }
          .sec-layout {
              background-color: rgba(224, 226, 226, 0.56);
              padding: 10px;
          }
          paper-card.sec-card {
              padding: 1em 2em;
              min-width: 20%;
          }
        </style>
        <vaadin-split-layout orientation="vertical" style="height: 100vh;">
            <div>
           <!-- ${this._menu}
            ${this._page} -->
                <vaadin-grid id="vaadin-grid" theme="row-stripes" page-size="10" column-reordering-allowed multi-sort>
                    <vaadin-grid-filter-column width="9em" path="key"></vaadin-grid-filter-column>
                    <vaadin-grid-sort-column width="9em" path="Lead"></vaadin-grid-sort-column>
                    <vaadin-grid-column width="9em" path="Departure"></vaadin-grid-column>
                    <vaadin-grid-sort-column width="9em" path="Value"></vaadin-grid-sort-column>
                    <vaadin-grid-sort-column width="9em" path="User"></vaadin-grid-sort-column>
                    <vaadin-grid-sort-column width="9em" path="Status"></vaadin-grid-sort-column>
                    <vaadin-grid-column width="14em"></vaadin-grid-column>
                </vaadin-grid>
                <div id="pages"></div>
            </div>
            <div class="sec-layout">
                <paper-card class="sec-card">
                    <h4>Row Details</h4>
                    <div>Key : <span id="keytxt"></span></div>
                    <div>
                        Lead : <span id="leadtxt"></span>
                    </div>
                    <div>
                        Departure : <span id="deptxt"></span>
                    </div>
                    <div>
                        Value : <span id="valtxt"></span>
                    </div>
                    <div>
                        Value : <span id="usrtxt"></span>
                    </div>
                    <div>
                        Status : <span id="ststxt"></span>
                    </div>
                </paper-card>
            </div>
        </vaadin-split-layout>
      `;
    }

    firstUpdated() {
        const keytxt = this.shadowRoot.getElementById("keytxt");
        const leadtxt = this.shadowRoot.getElementById("leadtxt");
        const deptxt = this.shadowRoot.getElementById("deptxt");
        const valtxt = this.shadowRoot.getElementById("valtxt");
        const usrtxt = this.shadowRoot.getElementById("usrtxt");
        const ststxt = this.shadowRoot.getElementById("ststxt");
        console.log(keytxt);
        const grid = this.shadowRoot.getElementById('vaadin-grid');
        fetch('data/bookings.json')
            .then(res => res.json())
            .then(json => grid.items = json);

        grid.addEventListener('dblclick', function(e) {
            const item = grid.getEventContext(e).item;
            toggleSelection(item);
        });

        const toggleSelection = function(item) {
            grid.selectedItems = grid.selectedItems[0] === item ? [] : [item];
        };

        grid.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const item = grid.getEventContext(e).item;
            toggleSelection(item);
        });

        grid.addEventListener('mouseover', function(e) {
            const item = grid.getEventContext(e).item;
            //    console.log(item);
        });

        grid.addEventListener('click', function(e) {
            //  alert(e);
            const item = grid.getEventContext(e).item;
            keytxt.innerHTML = item.key;
            leadtxt.innerHTML = item.Lead;
            deptxt.innerHTML = item.Departure;
            valtxt.innerHTML = item.Value;
            usrtxt.innerHTML = item.User;
            ststxt.innerHTML = item.Status;
            console.log(keytxt);
        });

        const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');

        columns[1].renderer = function(root, column, rowData) {
            //    console.log(root);
            let wrapper = root.firstElementChild;
            if (!wrapper) {
                root.innerHTML = '<div class="row-btn-cont" style="text-align: right">' +
                    '<paper-icon-button aria-label="Edit" icon="open-in-new">Edit' +
                    '</paper-icon-button>' +
                    '</div>';
                wrapper = root.firstElementChild;
            }
        }

    }

    _counterIncremented() {
        store.dispatch(increment());
    }

    _counterDecremented() {
        store.dispatch(decrement());
    }

    // This is called every time something is updated in the store.
    stateChanged(state) {
        this._page = state.app.page;
        this._menu = state.app.menu;
    }


}

window.customElements.define('my-view2', MyView2);