'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Login',

    signinVisibility: 'visible',
    registerVisibility: 'collapsed',
    passwordVisibility: 'collapsed',

    displayName: '',
    email: '',
    password: '',
    rememberme: '',
    showPassword: false,

    events: {
        register: 'register',
        showRegister: 'showRegister',
        password: 'password',
        showPassword: 'showPassword',
        showSignin: 'showSignin',
        signin: 'signin'
    },

    onSignin: function() {
        this.notify({
            eventName: this.events.signin,
            email: this.get('email'),
            password: this.get('password'),
            rememberme: this.get('rememberme')
        });
    },

    onShowRegister: function() {
        this.set('passwordVisibility', 'collapsed');
        this.set('signinVisibility', 'collapsed');
        this.set('registerVisibility', 'visible');
    },

    onRegister: function() {
        this.notify({
            eventName: this.events.register,
            displayName: this.get('displayName'),
            password: this.get('password'),
            email: this.get('email')
        });
    },

    onShowPassword: function() {
        this.set('passwordVisibility', 'visible');
        this.set('signinVisibility', 'collapsed');
        this.set('registerVisibility', 'collapsed');
    },

    onPassword: function() {
        this.notify({
            eventName: this.events.password,
            email: this.get('email')
        });
    },

    onShowSignin: function() {
        this.set('signinVisibility', 'visible');
        this.set('registerVisibility', 'collapsed');
        this.set('passwordVisibility', 'collapsed');
    },
    // additional properties

});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
module.exports = ViewModel;