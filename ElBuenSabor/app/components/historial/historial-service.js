'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/elBuenSabor'),
    // additional requires
    Everlive = require('../../everlive/everlive.all.min'),

    consts;


function Service() { }

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

Service.prototype.getAllRecords = function (filter) {

    if (!filter) {
        var filter = new Everlive.Query();
        filter.orderDesc('CreatedAt');
        filter.take(20);
    }


    var expandExp,
        data = dataService.data('pedidos');

    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

Service.prototype.configuration = dataService.setup;

// additional properties

// START_CUSTOM_CODE_historial
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_historial
module.exports = new Service();