'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/elBuenSabor'),
    // additional requires

    consts;

function Service() {}

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

Service.prototype.getAllRecords = function(filter) {
    var expandExp,
        data = dataService.data('categorias');

    expandExp = {

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

Service.prototype.configuration = dataService.setup;
module.exports = new Service();