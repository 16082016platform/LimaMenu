'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    gestures = require('ui/gestures'),
    dataService = require('../../dataProviders/elBuenSabor'),

    // additional requires

    viewModel = require('./users-view-model');

function onRequestSuccess() {

}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

function saveData() {
    var data = dataService.data('Users');

    data.save({

            celular: viewModel.get('celular'),

            direccion: viewModel.get('direccion'),

            // save properties

        })
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
}

function onusersModelFormSubmit() {
    saveData();
}

function onusersModelFormCancel() {
    helpers.back();
}

// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.usersModelSubmit, onusersModelFormSubmit);

        viewModel.on(viewModel.events.usersModelCancel, onusersModelFormCancel);

        // additional pageInit

    }
}

// START_CUSTOM_CODE_users
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_users
exports.pageLoaded = pageLoaded;