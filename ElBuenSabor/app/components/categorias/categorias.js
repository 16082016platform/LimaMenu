'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./categorias-service'),
    servicePlatos = require('../platos/platos-service'),
    // additional requires
    enums = require('ui/enums'),//animacion
    dialogs = require('ui/dialogs'),

    viewModel = require('./categorias-view-model');

function onListViewItemTap(args) {
    // var itemData = viewModel.get('listItems')[args.index];

    // helpers.navigate({
    //     moduleName: 'components/platos/platos',
    //     context: {
    //         filter: {
    //             categoria: itemData.details.Id
    //         }
    //     }
    // });
    var page = args.object;
    var itemData = viewModel.get('listPlatos')[page.index];
    helpers.navigate({
        moduleName: 'components/platos/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

function aumentar(args) {
    var page = args.object;
    var itemData = viewModel.get('listPlatos')[page.index];
    viewModel.aumentarCantidad(itemData);
}
exports.aumentar = aumentar;

function disminuir(args) {
    var page = args.object;
    var itemData = viewModel.get('listPlatos')[page.index];
    viewModel.disminuirCantidad(itemData);
}
exports.disminuir = disminuir;

function cargarPlatos(idCategoria) {
    if (viewModel.get('listPlatos').length > 0) {
        return;
    }

    viewModel.set('isLoading', true);
    viewModel.set('listPlatos', []);

    function _fetchData() {
        // return servicePlatos.getAllRecords({
        //     categoria: viewModel.get('categoriaActiva')
        // });
        return servicePlatos.getAllRecords();
    };

    _fetchData()
        .then(function (result) {
            var itemsList = [];

            result.forEach(function (item, index) {

                flattenLocationProperties(item);

                itemsList.push({

                    details: item,

                    Id: item.Id,

                    nombre: item.nombre,

                    // singleItem properties

                    isVisible: idCategoria == item.categoria ? true : false,

                    categoria: item.categoria,

                    cantidad: 0,

                    precio: item.precio,

                    index: index,
                });
            });
            viewModel.set('listPlatos', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
}
exports.cargarPlatos = cargarPlatos;

function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}
// additional functions

function pageLoaded(args) {
    var page = args.object;
    helpers.platformInit(page);
    page.bindingContext = viewModel;

    if (viewModel.get('listItems').length > 0) {
        return;
    }

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;
        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }
        return service.getAllRecords();
    };

    _fetchData()
        .then(function (result) {
            var itemsList = [];
            var width = page.getMeasuredWidth() / result.length;

            result.forEach(function (item) {

                flattenLocationProperties(item);

                itemsList.push({

                    nombre: item.nombre,

                    // singleItem properties
                    details: item,

                    width: width,

                    isActivo: false
                });
            });

            itemsList[0].isActivo = true;

            cargarPlatos(itemsList[0].details.Id);

            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded


    if (isInit) {
        isInit = false;

        // additional pageInit

        // var timer = require("timer");
        // let id = timer.setInterval(() => {
        //     cargarPlatos();
        //     timer.clearInterval(id);
        // }, 1500);
    }
}
exports.pageLoaded = pageLoaded;

// START_CUSTOM_CODE_categorias
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_categorias

function cambiarCategoria(args) {
    var page = args.object;
    viewModel.cambiarCategoria(page.idCategoria);
}
exports.cambiarCategoria = cambiarCategoria;

function goToPedidos(args) {
    if (viewModel.get('listPedidos').length == 0) {
        dialogs.alert({
            message: "El carrito está vacio",
            okButtonText: "OK"
        })
        return;
    }

    helpers.navigate({
        moduleName: 'components/pedidos/pedidos',
        transitioniOS: {
            name: "slideTop",
            // duration: 1000,
            curve: "easeIn"
        },
        transitionAndroid: {
            name: "slideTop",
            // duration: 1000,
            curve: "easeOut"
        }
    });
}
exports.goToPedidos = goToPedidos;

//FIX select color disabled
function listViewItemLoading(args) {
    var cell = args.ios;
    cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
}
exports.listViewItemLoading = listViewItemLoading;

// animacion footer
function onAnimateSpring(args) {
    var page = args.object;
    var view = page.getViewById("footer");
    view.animate({
        translate: { x: 0, y: 100 },
        duration: 1000,
        curve: enums.AnimationCurve.spring
    });
}
exports.onAnimateSpring = onAnimateSpring;