angular.module('material-cmis').controller('mainController', function ($scope, $http, $log, $cmisRepositories, $cmisService, $materialToast) {
    "use strict";

    //$scope functions
    $scope.onTabSelected = onRepoSelected;
    $scope.breadcrumbNav = breadcrumbNav;
    $scope.openFolder = openFolder;

    //init
    $scope.repositories = $cmisRepositories;
    clearBreadcrumb();


    //controller functions
    function clearBreadcrumb() {
        $scope.parents = [];
    }

    function onRepoSelected(repository) {
        $scope.activeRepository = repository;
        clearBreadcrumb();
        $scope.nodes = $scope.openFolder(repository.start, repository.start);
        $materialToast({
            template: '<div>Credentials: ' + repository.credentials.username + ":" + repository.credentials.password +"</div>",
            duration: 4000,
            position: 'top right'
        });
    }

    function breadcrumbNav(index) {
        var selected = $scope.parents[index];
        $scope.parents = $scope.parents.slice(0, index);
        $scope.openFolder(selected.path, selected.name);
    }

    function openFolder(path, name) {
        $cmisService.getChildren($scope.activeRepository, path).then(function (response) {
            $scope.nodes = response.data.objects;
            $log.log($scope.nodes);
            $scope.parents.push({
                path: path,
                name: name
            });
        });
    }
});