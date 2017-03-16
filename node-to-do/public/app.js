var expenseCalculator = angular.module('expenseCalculator', []);

function expenseCalculatorController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/expenses')
        .success(function(data) {
            $scope.expenses = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createExpense = function() {
        $http.post('/api/expenses', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.expenses = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteExpense = function(id) {
        $http.delete('/api/expenses/' + id)
            .success(function(data) {
                $scope.expenses = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
