'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Login",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Categorías",
    "moduleName": "components/categorias/categorias",
    "icon": "\ue204"
}, {
    "title": "Perfil",
    "moduleName": "components/users/users",
    "icon": "\ue0e4"
}, {
    "title": "Platos",
    "moduleName": "components/platos/platos",
    "icon": "\ue204"
}, {
    "title": "Historial",
    "moduleName": "components/historial/historial",
    "icon": "\ue0d2"
}, {
    "title": "Direcciones",
    "moduleName": "components/direcciones/direcciones",
    "icon": "\ue0d8"
}, {
    "title": "Sugerencias",
    "moduleName": "components/sugerencias/sugerencias",
    "icon": "\ue0d8"
}, {
    "title": "Nosotros",
    "moduleName": "components/nosotros/nosotros",
    "icon": "\ue0de"
}, {
    "title": "Salir",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue1ff",
    "context": {
        "logout": true
    }
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;