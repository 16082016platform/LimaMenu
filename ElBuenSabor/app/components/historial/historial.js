'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./historial-service'),
    // additional requires

    viewModel = require('./historial-view-model');

function onListViewItemTap(args) {
    var aaa = new Date();
    viewModel.set('listPedido', aaa);
    var itemData = viewModel.get('listItems')[args.index];

    if (itemData.estado == 'llegando') {
        helpers.navigate({
            moduleName: 'components/historial/itemDetails/itemDetails',
            context: itemData.details
        });
    } else {
        viewModel.set('listEntregados', itemData.pedido);
        viewModel.toggleAcordeon(itemData.details.Id);
    }
}
exports.onListViewItemTap = onListViewItemTap;

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

            result.forEach(function (item) {

                flattenLocationProperties(item);

                itemsList.push({

                    codigo: item.codigo,

                    total: item.total,
                    
                    estado: item.estado,

                    CreatedAt: formatTime(item.CreatedAt),

                    isActivo: false,

                    pedido: item.pedido,
                    // singleItem properties
                    details: item
                });
            });

            // itemsList.sort(function (a, b) {
            //     return (b.codigo - a.codigo)
            // })

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
    }
}

// START_CUSTOM_CODE_historial
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_historial
exports.pageLoaded = pageLoaded;


function formatTime(time) {
    var hour = time.getHours();
    var min = time.getMinutes() + "";
    return time.toDateString() + "  -  " + (hour <= 12 ? hour : hour - 12) + ":" + (min.length === 1 ? '0' + min : min) + (hour < 12 ? " am" : " pm");
}