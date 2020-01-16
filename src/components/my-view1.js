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
import '@google-web-components/google-chart/google-chart.js';

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-button/paper-button.js'
import '@vaadin/vaadin-notification/vaadin-notification.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView1 extends PageViewElement {
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

          padding: 10px;
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
      </style>
      <div class="chart-cont">
        <div class="chart-div-col">
          <google-chart
            type="column"
            options='{"title": "Sales in a month"}'
            cols='[{"label": "Month", "type": "string"},{"label": "Sales", "type": "number"}]'
            rows='[["Jan", 21],["Feb", 8],["Mar", 12],["Apr", 15],["May", 9],["Jun", 10]]'>
          </google-chart>
        </div>
        <div class="chart-div-col">
          <google-chart
            type="column"
            options='{"title": "Bookings in a month"}'
            cols='[{"label": "Month", "type": "string"},{"label": "Booking", "type": "number"}]'
            rows='[["Jan", 41],["Feb", 18],["Mar", 31],["Apr", 20],["May", 35],["Jun", 40]]'>
          </google-chart>
        </div>
        <div class="chart-div-col">
          <google-chart
            type="column"
            options='{"title": "Departure in a month"}'
            cols='[{"label": "Month", "type": "string"},{"label": "Departure", "type": "number"}]'
            rows='[["Jan", 11],["Feb", 18],["Mar", 11],["Apr", 10],["May", 15],["Jun", 10]]'>
          </google-chart>
        </div>
      </div>
      <div class="chart-cont">
        <google-chart
            type="combo"
            options='{"title": "Bookings status this week", "seriesType": "bars", "series": {"2": {"type": "line"}}}'
            data='[["Day", "Sale", "Confirmed", "C"],
                  ["Mon", 20, 45, 28],
                  ["Tue", 31, 66, 38],
                  ["Wed", 50, 80, 55],
                  ["Thu", 77, 50, 77],
                  ["Fri", 68, 15, 66]]'>
        </google-chart>
      </div>
      <paper-fab icon="add" title="add" id="fabbtn"></paper-fab>
      <vaadin-notification duration="4000" position="bottom-start">test</vaadin-notification>
    `;
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
    updated() {

    }
}

window.customElements.define('my-view1', MyView1);