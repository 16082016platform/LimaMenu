var color_1 = require("color");
var platform = require("platform");
// var navigator = require("../../common/navigator");
var navigator = require('../../utils/widgets/navigation-property');
// var linearGradient = require("../../common/linear-gradient");
var conferenceViewModel = require("./conference-view-model");
function pageNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = conferenceViewModel.instance;
}
exports.pageNavigatingTo = pageNavigatingTo;
function doNotShowAndroidKeyboard(args) {
    var searchBar = args.object;
    if (searchBar.android) {
        searchBar.android.clearFocus();
    }
}
exports.doNotShowAndroidKeyboard = doNotShowAndroidKeyboard;
function onBackgroundLoaded(args) {
    var background = args.object;
    var colors = new Array(new color_1.Color("#67749b"), new color_1.Color("#5b677b"));
    // var orientation = linearGradient.Orientation.Top_Bottom;
    switch (platform.device.os) {
        case platform.platformNames.android:
            // linearGradient.drawBackground(background, colors, orientation);
            break;
        case platform.platformNames.ios:
            // The iOS view has to be sized in order to apply a background
            setTimeout(function () {
                // linearGradient.drawBackground(background, colors, orientation);
            });
            var search = background.getViewById("search");
            search.ios.backgroundImage = UIImage.alloc().init();
            break;
    }
}
exports.onBackgroundLoaded = onBackgroundLoaded;
function changeCellBackground(args) {
    if (args.ios) {
        var cell = args.ios;
        cell.backgroundColor = UIColor.clearColor();
    }
}
exports.changeCellBackground = changeCellBackground;
function toggleFavourite(args) {
    var session = args.view.bindingContext;
    session.toggleFavourite();
}
exports.toggleFavourite = toggleFavourite;
var closeTimeout = 0;
function inputTap(args) {
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(function () {
        closeTimeout = 0;
    }, 20);
}
exports.inputTap = inputTap;
function tap(args) {
    var page = args.object.page;
    if (!closeTimeout) {
        closeTimeout = setTimeout(function () {
            page.getViewById("search").dismissSoftInput();
            closeTimeout = 0;
        }, 20);
    }
}
exports.tap = tap;
function goBack(args) {
    navigator.navigateBackFromExample();
}
exports.goBack = goBack;
