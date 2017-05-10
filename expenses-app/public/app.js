var expenseCalculator = angular.module('expenseCalculator', []);

function expenseCalculatorController($scope, $http) {
    $scope.formData = {};


    $http.get('/api/expenses')
        .success(function(data) {
            $scope.expenses = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        $http.get('/api/currency')
            .success(function(data) {
                $scope.currency = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    $scope.createExpense = function() {
        $http.post('/api/expenses', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.expenses = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };

    $scope.deleteExpense = function(id) {
        $http.delete('/api/expenses/' + id)
            .success(function(data) {
                $scope.expenses = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTotal = function(amount, currency) {
        var total = 0;
        angular.forEach($scope.expenses, function(row) {
          if (row[currency] === 'USD') {
            console.log('Converting ' + row[amount] + ' USD to NIS');
            nisAmount = row[amount] * 3.63;
            console.log('In Shekel:' + nisAmount);
          }
          else{
            nisAmount = row[amount]
          };
            total += nisAmount;
        });
        return total;
    };

    $scope.getCurrency = function(currency){
      if ($scope.expense.currency){
        return true;
      }

    };

}
