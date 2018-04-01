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
    }).then(() => {
        $scope.wagers = []
        $scope.values.forEach((value) => {
            let wager = {
                value: value,
                clues: []
            }
            $scope.categories.forEach((category) => {
                $http({
                    url: BASE_URL + `/clues?value=${value}&category=${category.id}`
                }).then(response => {
                    console.log("clues", response.data)
                    let i = Math.random() * response.data.length
                    wager.clues.push(response.data[i])
                })

            })
            $scope.wagers.push(wager)
        })

    })
    $scope.showClue = false
    $scope.displayClue = (clue, value) => {
        console.dir(clue)
        $scope.currentClue = clue
        $scope.currentWager = value
        $scope.showClue = true
    }
    console.dir($scope)
}])