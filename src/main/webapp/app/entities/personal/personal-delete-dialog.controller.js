(function() {
    'use strict';

    angular
        .module('sicreOpleApp')
        .controller('PersonalDeleteController',PersonalDeleteController);

    PersonalDeleteController.$inject = ['$uibModalInstance', 'entity', 'Personal'];

    function PersonalDeleteController($uibModalInstance, entity, Personal) {
        var vm = this;

        vm.personal = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Personal.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
