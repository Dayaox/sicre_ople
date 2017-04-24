(function() {
    'use strict';

    angular
        .module('sicreOpleApp')
        .controller('PersonalDetailController', PersonalDetailController);

    PersonalDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Personal', 'User'];

    function PersonalDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Personal, User) {
        var vm = this;

        vm.personal = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('sicreOpleApp:personalUpdate', function(event, result) {
            vm.personal = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
