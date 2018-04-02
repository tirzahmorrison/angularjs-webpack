const BASE_URL = "http://jservice.io/api"
const app = angular.module("main", ["customFilters"]);

app.controller("mainController", ["$scope", "$http", "$interval", ($scope, $http, $interval) => {
    $scope.values = [100, 200, 300, 400, 500]

    $scope.currentPlayer = {
        name: "t-rex",
        score: 0
    }

    $http({
        url: BASE_URL + "/random?count=5"
    }).then(response => {
        console.log(response)
        console.log(response.data)
        $scope.categories = response.data.map(c => c.category)
    }).then(() => {
        $scope.wagers = []
        $scope.values.forEach((value, i) => {
            let wager = {
                value: value,
                clues: []
            }
            $scope.wagers.push(wager)
            $scope.categories.forEach((category, j) => {
                $http({
                    url: BASE_URL + `/clues?category=${category.id}`
                }).then(response => {
                    console.log("clues", response.data)
                    const clue = response.data.filter(c => c.value >= value)[0]
                    $scope.wagers[i].clues[j] = clue
                })

            })

        })

    })
    $scope.showClue = false
    $scope.checkAnswer = () => { $scope.showClue = false }
    $scope.displayClue = (clue, value) => {
        console.dir(clue)
        $scope.currentClue = clue
        $scope.currentWager = value
        $scope.showClue = true
        $scope.timerStarted = true
        console.log(value)
    }
    console.dir($scope)

    $scope.seconds = "30"
    $scope.timerStarted = false

    const timerFunc = () => {
        if (!$scope.timerStarted) {
            return
        }
        let currentSecond = Number($scope.seconds) - 1
        if (currentSecond < 10) {
            currentSecond = "0" + currentSecond
        }
        $scope.seconds = currentSecond
        if (currentSecond === "00") {
            $scope.seconds = "30"
            $scope.timerStarted = false
            timeOut()
        }
    }
    $interval(timerFunc, 1000)
}])