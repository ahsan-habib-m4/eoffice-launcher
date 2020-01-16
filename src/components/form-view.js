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
import { PolymerElement } from '@polymer/polymer';
import { PageViewElement } from './page-view-element.js';
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

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class FormView extends PageViewElement {
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
          paper-slider {
            width: 100%;
          }
          paper-slider paper-input.slider-input {
            widows: 70px;
          }
        </style>
        <style is="custom-style">
            paper-slider.red {
              --paper-slider-knob-color: var(--paper-red-500);
              --paper-slider-active-color: var(--paper-red-500);
            }
            paper-slider.green {
              --paper-slider-knob-color: var(--paper-green-500);
              --paper-slider-active-color: var(--paper-green-500);
            }
            paper-slider.blue {
              --paper-slider-knob-color: var(--paper-light-blue-500);
              --paper-slider-active-color: var(--paper-light-blue-500);
            }
          </style>
        <paper-card>
          <div class="card-content">
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
                    <vaadin-date-picker label="Date" placeholder="Date of Birth" name="date"></vaadin-date-picker>
                  </div>
                  <div class="input-group">
                    <vaadin-time-picker label="Delivery Time" name="time"></vaadin-time-picker>
                  </div>
                  <div class="input-group">
                    <paper-checkbox name="all" value="all" checked>All</paper-checkbox><br>
                  </div>
                  <br>
                  <br>
                  <paper-button class="sbmt-btn" raised  @click="${this._submitForm}">Submit</paper-button>
                </form>
              </iron-form>
          </div>
        </paper-card>
        <br>
        <div id="output"></div>
      </iron-form>
    `;
    }

    firstUpdated() {
        const output = this.shadowRoot.getElementById('output');
        const form = this.shadowRoot.querySelector('iron-form');
        console.log(output);
        form.addEventListener('iron-form-submit', function(event) {
            //alert(JSON.stringify(event.detail));
            output.innerHTML = JSON.stringify(event.detail);
        });
    }

    _submitForm() {
        this.shadowRoot.querySelector('iron-form').submit();
    }


}

window.customElements.define('form-view', FormView);