'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires
var helpers = require('../../utils/widgets/helper'); //navegacion
ViewModel = new Observable({

    pageTitle: 'Categorías',

    isLoading: false,
    listItems: [],
    // additional properties
    listPlatos: [],
    listPedidos: [],
    total: 0,
    cantidad: 0,
    existenPlatos: true,
    cambiarCategoria: function (idCategoria) {
        var listItems = [];
        for (var i = 0; i < this.listItems.length; ++i) {
            this.listItems[i].details.Id == idCategoria ? this.listItems[i].isActivo = true : this.listItems[i].isActivo = false;
            listItems.push(this.listItems[i]);
        }

        this.set('listItems', listItems);
        this.cambiarListaPlatos(idCategoria);

    },
    cambiarListaPlatos: function (idCategoria) {
        var listPlatos = [];
        var existe = false;
        for (var i = 0; i < this.listPlatos.length; ++i) {
            if (this.listPlatos[i].categoria == idCategoria) {
                this.listPlatos[i].isVisible = true;
                existe = true;
            } else {
                this.listPlatos[i].isVisible = false;
            }
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
        this.set('existenPlatos', existe);
    },
    aumentarCantidad: function (itemPlato) {
        var listPlatos = [], total = 0, cantidad = 0;
        this.set('listPedidos', []);

        for (var i = 0; i < this.listPlatos.length; ++i) {
            if (this.listPlatos[i].Id == itemPlato.Id) {
                this.listPlatos[i].cantidad += 1;
            }
            if (this.listPlatos[i].cantidad > 0) {
                var pedido = {};
                pedido.Id = this.listPlatos[i].Id;
                pedido.cantidad = this.listPlatos[i].cantidad;
                pedido.precio = this.listPlatos[i].precio;
                pedido.nombre = this.listPlatos[i].nombre;
                pedido.index = this.listPlatos[i].index;
                this.listPedidos.push(pedido);
            }
            cantidad += this.listPlatos[i].cantidad;
            total += parseFloat(this.listPlatos[i].precio) * this.listPlatos[i].cantidad;

            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
        this.set('cantidad', cantidad);
        this.set('total', total);
        // this.set('listPedidos', this.listPedidos);
    },
    disminuirCantidad: function (itemPlato) {
        if (itemPlato.cantidad == 0) {
            return;
        }
        var listPlatos = [], total = 0, cantidad = 0;
        this.set('listPedidos', []);

        for (var i = 0; i < this.listPlatos.length; ++i) {
            if (this.listPlatos[i].Id == itemPlato.Id) {
                this.listPlatos[i].cantidad -= 1;
            }
            if (this.listPlatos[i].cantidad > 0) {
                var pedido = {};
                pedido.Id = this.listPlatos[i].Id;
                pedido.cantidad = this.listPlatos[i].cantidad;
                pedido.precio = this.listPlatos[i].precio;
                pedido.nombre = this.listPlatos[i].nombre;
                this.listPedidos.push(pedido);
            }
            cantidad += this.listPlatos[i].cantidad;
            total += parseFloat(this.listPlatos[i].precio) * this.listPlatos[i].cantidad;

            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
        this.set('cantidad', cantidad);
        this.set('total', total);
    },
    limpiarPedidos: function () {
        var listPlatos = [];
        for (var i = 0; i < this.listPlatos.length; ++i) {
            this.listPlatos[i].cantidad = 0;
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
        this.set('listPedidos', []);
        this.set('total', 0);
        this.set('cantidad', 0);
    },
    aumentarPedido: function (itemPlato) {//ojo platos por el index
        var listPedidos = [], listPlatos = [], total = 0, cantidad = 0;
        for (var i = 0; i < this.listPedidos.length; ++i) {
            if (this.listPedidos[i].Id == itemPlato.Id) {
                this.listPedidos[i].cantidad += 1;
            }
            listPedidos.push(this.listPedidos[i]);
            cantidad += this.listPedidos[i].cantidad;
            total += parseFloat(this.listPedidos[i].precio) * this.listPedidos[i].cantidad;
        }
        for (var i = 0; i < this.listPlatos.length; ++i) {
            if (this.listPlatos[i].Id == itemPlato.Id) {
                this.listPlatos[i].cantidad += 1;
            }
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('cantidad', cantidad);
        this.set('total', total);
        this.set('listPedidos', []);
        this.set('listPedidos', listPedidos);
        this.set('listPlatos', []);
        this.set('listPlatos', listPlatos);
    },
    disminuirPedido: function (itemPedido) {
        var listPedidos = [], listPlatos = [];
        for (var i = 0; i < this.listPedidos.length; ++i) {
            if (this.listPedidos[i].Id == itemPedido.Id) {
                this.listPedidos[i].cantidad -= 1;
            }
            if (this.listPedidos[i].cantidad !== 0) {
                listPedidos.push(this.listPedidos[i]);
            }
        }
        for (var i = 0; i < this.listPlatos.length; ++i) {
            if (this.listPlatos[i].Id == itemPedido.Id) {
                this.listPlatos[i].cantidad -= 1;
            }
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('cantidad', this.cantidad - 1);
        this.set('total', Number(this.total) - Number(this.listPlatos[itemPedido.index].precio));
        this.set('listPedidos', []);
        this.set('listPedidos', listPedidos);
        this.set('listPlatos', []);
        this.set('listPlatos', listPlatos);

        if (this.listPedidos.length == 0) {
            goBack();
        }
    },
});
module.exports = ViewModel;


function goBack() {
    var frameModule = require("ui/frame");
    var topmost = frameModule.topmost();
    topmost.goBack();

    // helpers.navigate({
    //     moduleName: 'components/categorias/categorias',
    //     transitioniOS: {
    //         name: "slideBottom",
    //         // duration: 1000,
    //         curve: "easeIn"
    //     },
    //     transitionAndroid: {
    //         name: "slideBottom",
    //         // duration: 1000,
    //         curve: "easeOut"
    //     }
    // });
}