/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { checkout } from '../actions/shop.js';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({
    shop
});

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

// These are the elements needed for datatable
import '@vaadin/vaadin-grid/theme/material/vaadin-grid.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-selection-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/theme/material/vaadin-grid-filter-column.js';

class MyView3 extends connect(store)(PageViewElement) {
    static get properties() {
        return {
            // This is the data from the store.
            _quantity: { type: Number },
            _error: { type: String }
        };
    }

    static get styles() {
        return [
            SharedStyles,
            ButtonSharedStyles,
            css `
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }

        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }

        .cart,
        .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }

        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
      `
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
        </style>
    
          <div>
              <vaadin-grid id="vaadin-grid" theme="row-dividers" page-size="10" column-reordering-allowed multi-sort>
                <vaadin-grid-filter-column width="9em" path="key"></vaadin-grid-filter-column>
                <vaadin-grid-sort-column width="9em" path="Description"></vaadin-grid-sort-column>
              </vaadin-grid>
              <div id="pages"></div>
          </div>
    `;
    }

    firstUpdated() {
        console.log("test"); // log shadow root
        console.log(this.shadowRoot.getElementById('vaadin-grid')); // log null
        const grid = this.shadowRoot.getElementById('vaadin-grid');
        console.log(grid);
        fetch('data/accommodation.json')
            .then(res => res.json())
            .then(json => grid.items = json);
    }

    _checkoutButtonClicked() {
        store.dispatch(checkout());
    }

    // This is called every time something is updated in the store.
    stateChanged(state) {
        this._quantity = cartQuantitySelector(state);
        this._error = state.shop.error;
        this._page = state.app.page;
    }
}

window.customElements.define('my-view3', MyView3);