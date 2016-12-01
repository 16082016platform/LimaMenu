'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Historial',

    isLoading: false,
    listItems: [],
    // additional properties
    listEntregados: [],

    toggleAcordeon: function (idPedido) {
        var listItems = [];
        for (var i = 0; i < this.listItems.length; ++i) {
            this.listItems[i].details.Id == idPedido ? this.listItems[i].isActivo = true : this.listItems[i].isActivo = false;
            listItems.push(this.listItems[i]);
        }
        this.set('listItems', listItems);
    }
});

// START_CUSTOM_CODE_historial
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_historial
module.exports = ViewModel;