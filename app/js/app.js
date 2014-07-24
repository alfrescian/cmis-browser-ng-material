angular.module('material-cmis', ['ngMaterial'])
    .directive('cmisObject', function () {
        "use strict";
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'cmis-object.html',
            scope: {
                properties: '=',
                clickHandler: '&clickHandler',
                baseUrl:'='
            },
            link: function (scope, element, attrs) {
                scope.click = function () {
                    scope.clickHandler({
                        path: scope.properties['cmis:path'],
                        name: scope.properties['cmis:name']
                    });
                };
            }
        };
    })
    .filter('cmisDownloadUrl', function () {
        "use strict";
        return function(objectId, baseUrl, asAttachment) {
            var downloadUrl = baseUrl + 'root?objectId='+ objectId +'&cmisselector=content';
            if (asAttachment){
                downloadUrl += '&download=attachment';
            }
            return downloadUrl;
        };
    });