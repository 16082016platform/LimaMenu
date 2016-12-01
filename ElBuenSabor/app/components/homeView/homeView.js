'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./homeView-service'),
    localSettings = require('application-settings'),
    // additional requires

    viewModel = require('./homeView-view-model');

function validateData(data) {
    if (!data.email) {
        alert('Ingrese correo');
        return false;
    }

    if (!data.password) {
        alert('Ingrese contraseña');
        return false;
    }

    return true;
}

function authError(error) {
    if (error) {
        if (error.message) {
            alert(error.message);
        }

        return false;
    }
}

function signinSuccess() {
    helpers.navigate('components/nosotros/nosotros');
}

function onSignin(data) {
    if (validateData(data)) {
        data.email = data.email.toLowerCase();
        service.signin(data, signinSuccess, authError);
    }
}

function registerSuccess() {
    helpers.navigate('components/nosotros/nosotros');
}

function passwordSuccess() {
    // helpers.navigate('components/homeView/homeView');
    viewModel.onShowSignin();
}

function onRegister(data) {
    if (validateData(data)) {
        data.email = data.email.toLowerCase();
        service.register(data, registerSuccess, authError);
    }
}

function onPassword(data) {
    if (!data.email) {
        alert('Ingrese correo');
        return false;
    }else{
        data.email = data.email.toLowerCase();
        service.password(data, passwordSuccess, authError);
    }
}

function onShowRegister() {
    viewModel.onShowRegister();
}
function onShowPassword() {
    viewModel.onShowSendPassword();
}
function onShowSignin() {
    viewModel.onShowSignin();
}

// additional functions

function onShowPasswordTapped(args) {
    var view = args.object;
    var viewModel = view.page.bindingContext;
    viewModel.showPassword = !viewModel.showPassword;
}
exports.onShowPasswordTapped = onShowPasswordTapped;

function pageLoaded(args) {
    var frameModule = require("ui/frame");
    // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    } else {
        frameModule.topmost().android.navBarVisibility = "never";
    }

    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    if (page.navigationContext && page.navigationContext.logout) {
        service.signout(onShowSignin, onShowSignin);
    } else {
        if (service.isAuthenticated()) {
            service.setAuthorization();
            signinSuccess();
        } else {
            var rememberedData = localSettings.hasKey(service.rememberKey) && JSON.parse(localSettings.getString(service.rememberKey));
            if (rememberedData && rememberedData.email && rememberedData.password) {
                onSignin(rememberedData);
            }
        }
    }
    // additional pageLoaded

    // Create the parallax background effect by scaling the background image
    page.getViewById("backgroundParallax").animate({
        scale: { x: 1.2, y: 1.2 },
        duration: 8000
    });

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.signin, onSignin);

        viewModel.on(viewModel.events.register, onRegister);
        viewModel.on(viewModel.events.showRegister, onShowRegister);
        viewModel.on(viewModel.events.password, onPassword);
        viewModel.on(viewModel.events.showPassword, onShowPassword);
        viewModel.on(viewModel.events.showSignin, onShowSignin);
        // additional pageInit
    }
}

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
exports.pageLoaded = pageLoaded;
