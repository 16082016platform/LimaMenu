'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Perfil',

    events: {
        usersModelSubmit: 'usersModelSubmit',
        usersModelCancel: 'usersModelCancel'
    },

    onusersModelFormSubmit: function() {
        this.notify({
            eventName: this.events.usersModelSubmit
        });
    },

    onusersModelFormCancel: function() {
        this.notify({
            eventName: this.events.usersModelCancel
        });
    },

    celular: '',

    direccion: '',

    // additional properties

});

// START_CUSTOM_CODE_users
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_users
module.exports = ViewModel;