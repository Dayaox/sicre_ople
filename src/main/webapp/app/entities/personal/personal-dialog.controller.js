(function() {
    'use strict';

    angular
        .module('sicreOpleApp')
        .controller('PersonalDialogController', PersonalDialogController);

    PersonalDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Personal', 'User'];

    function PersonalDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Personal, User) {
        var vm = this;

        vm.personal = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personal.id !== null) {
                Personal.update(vm.personal, onSaveSuccess, onSaveError);
            } else {
                Personal.save(vm.personal, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('sicreOpleApp:personalUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


        vm.setFoto = function ($file, personal) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        personal.foto = base64Data;
                        personal.fotoContentType = $file.type;
                    });
                });
            }
        };

    }
})();
