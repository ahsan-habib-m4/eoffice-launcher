/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SETSUBMENU = 'SETSUBMENU';
export const REMOVESUBMENU = 'REMOVESUBMENU';
export const UPDATEACTIVEMENU = 'UPDATEACTIVEMENU';

export const increment = () => {
    return {
        type: INCREMENT
    };
};

export const decrement = () => {
    return {
        type: DECREMENT
    };
};


export const setsubmenu = (submenu, activeMenu) => {
    return {
        type: SETSUBMENU,
        submenu,
        activeMenu
    };
};

export const removesubmenu = () => {
    return {
        type: REMOVESUBMENU
    };
};

export const updateactivemenu = (activemenu) => {
    return {
        type: UPDATEACTIVEMENU,
        activemenu
    };
};