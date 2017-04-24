(function() {
    'use strict';

    angular
        .module('sicreOpleApp')
        .controller('PersonalController', PersonalController);

    PersonalController.$inject = ['DataUtils', 'Personal'];

    function PersonalController(DataUtils, Personal) {

        var vm = this;

        vm.personals = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Personal.query(function(result) {
                vm.personals = result;
                vm.searchQuery = null;
            });
        }
    }
})();
