const BASE_URL = "http://jservice.io/api"
const app = angular.module("main", ["customFilters"]);

app.controller("mainController", ["$scope", "$http", ($scope, $http) => {
    $scope.values = [100, 200, 300, 400, 500]

    $http({
        url: BASE_URL + "/random?count=5"
    }).then(response => {
        console.log(response)
        console.log(response.data)
        $scope.categories = response.data.map(c => c.category)

    })
    $scope.values.forEach((value) => {
    $scope.categories.forEach((category) => {
            $http({
                url: BASE_URL + `/clues?value=${value}&category=${category.id}`
            }).then(response => {
                console.log("clues", response.data)
                $scope.wagers
            })
        })
    })
    console.dir($scope)
}])