(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            restrict: "E",
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                message: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }


    function FoundItemsDirectiveController() {
        var list = this;

        list.isListEmpty = function () {
            if (!list.foundItems.length) {
                return true;
            }

            return false;
        };
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;
        list.items = [];
        list.searchTerm = '';
        list.message = '';

        list.getMatchedMenuItems = function (searchTerm) {
            if (list.searchTerm) {
                MenuSearchService.getMatchedMenuItems(searchTerm).then(function (response) {
                    list.items = response;
                });
            }

            if (!list.searchTerm || !list.items.length) {
                list.message = 'Nothing found';
            }
        }        

        list.removeItem = function (index) {

            MenuSearchService.removeItem(index);
            
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath']
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        var items = [];

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];

                for (var i = 0; i < result.data.menu_items.length; i++) {
                    var desc = result.data.menu_items[i].description;
                    if (desc.toLowerCase().indexOf(searchTerm) !== -1) {
                        foundItems.push(result.data.menu_items[i]);
                    }
                }
                items = foundItems;
                // return processed items
                return foundItems;
            });
        };

        service.removeItem = function (index) {
            items.splice(index, 1);
        };
    }

})();
