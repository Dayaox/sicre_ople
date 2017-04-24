(function() {
    'use strict';
    angular
        .module('sicreOpleApp')
        .factory('Personal', Personal);

    Personal.$inject = ['$resource'];

    function Personal ($resource) {
        var resourceUrl =  'api/personals/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
