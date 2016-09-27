(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListBuyController(ShoppingListCheckOffService) {
        var buyList = this;

        buyList.items = ShoppingListCheckOffService.getItems();

        buyList.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.getBoughtItems();

    }


    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var items = [{ name: "cookies", quantity: 10 }, { name: "chips", quantity: 5 }, { name: "crunchy", quantity: 1 },
                     { name: "apple", quantity: 12 }, { name: "orange", quantity: 20 }];

        var boughtItems = [];

        service.buyItem = function (index) {
            var item = items[index];
            items.splice(index, 1);

            boughtItems.push(item);
        };

        service.getItems = function () {
            return items;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    }

})();
