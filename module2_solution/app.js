(function () {
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListBuyController', ShoppingListBuyController)
    .controller('ShoppingListBoughtController', ShoppingListBoughtController)
    .service('ShoppingListService', ShoppingListService);

    ShoppingListBuyController.$inject = ['ShoppingListService'];
    function ShoppingListBuyController(ShoppingListService) {
        var buyList = this;

        buyList.items = ShoppingListService.getItems();

        buyList.buyItem = function (index) {
            ShoppingListService.buyItem(index);
        }
    }


    ShoppingListBoughtController.$inject = ['ShoppingListService'];
    function ShoppingListBoughtController(ShoppingListService) {
        var boughtList = this;

        boughtList.items = ShoppingListService.getBoughtItems();

    }


    function ShoppingListService() {
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
