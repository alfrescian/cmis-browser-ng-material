(function () {
    'use strict';

    angular.module('material-cmis').factory('$cmisService', ['$log', '$http', '$filter', '$cmisRepositories', CmisService]);
    angular.module('material-cmis').constant('$cmisRepositories', [
        {
            repoId:1,
            start: "Sites",
            title: "Alfresco",
            credentials: {
                username: "admin",
                password: "admin"
            },
            url: "http://cmis.alfresco.com/cmisbrowser/0af93946-f4a2-44da-88b8-4b24bdc6dbad/"
        },
        {
            repoId:2,
            title: "Nuxeo",
            start: "Asset Library",
            credentials: {
                username: "Administrator",
                password: "Administrator"
            },
            url: "http://cmis.demo.nuxeo.org/nuxeo/json/cmis/default/"
        }
    ]);



    function CmisService($log, $http, $filter, $cmisRepositories) {
        var callback = 'callback=JSON_CALLBACK';
        
        return {
            getChildren: function (repository, path) {
                var url = repository.url + 'root/' + path + '?cmisselector=children&succinct=true&' + callback;
                return $http.jsonp(url);
            },
            getBaseUrl: function(repoId){
                return $filter('filter')($cmisRepositories, {repoId:repoId}, true)[0].url;
            }
        };
    }


}());