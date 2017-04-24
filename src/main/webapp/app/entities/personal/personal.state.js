(function() {
    'use strict';

    angular
        .module('sicreOpleApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('personal', {
            parent: 'entity',
            url: '/personal',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Personals'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/personal/personals.html',
                    controller: 'PersonalController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('personal-detail', {
            parent: 'personal',
            url: '/personal/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Personal'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/personal/personal-detail.html',
                    controller: 'PersonalDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Personal', function($stateParams, Personal) {
                    return Personal.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'personal',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('personal-detail.edit', {
            parent: 'personal-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/personal/personal-dialog.html',
                    controller: 'PersonalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Personal', function(Personal) {
                            return Personal.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('personal.new', {
            parent: 'personal',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/personal/personal-dialog.html',
                    controller: 'PersonalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                distrito: null,
                                municipio: null,
                                cargo: null,
                                nombre: null,
                                tipo: null,
                                foto: null,
                                fotoContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('personal', null, { reload: 'personal' });
                }, function() {
                    $state.go('personal');
                });
            }]
        })
        .state('personal.edit', {
            parent: 'personal',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/personal/personal-dialog.html',
                    controller: 'PersonalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Personal', function(Personal) {
                            return Personal.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('personal', null, { reload: 'personal' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('personal.delete', {
            parent: 'personal',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/personal/personal-delete-dialog.html',
                    controller: 'PersonalDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Personal', function(Personal) {
                            return Personal.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('personal', null, { reload: 'personal' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
