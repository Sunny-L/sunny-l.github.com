'use strict'
var controllers = angular.module('controllers',[]);

controllers.controller('listCtrl',['$scope','$filter',function($scope,$filter){
    $scope.list = storeService.fetch();

    var orderBy = $filter('orderBy');
    $scope.newGoods = {
        title:'',
        price:0,
        volume:0
    }
    $scope.sortKeys = {
        'price':false,
        'volume':false
    }

    $scope.handleUpdate = function(index){
        $scope.list[index].isEdit = true;
    }
    $scope.handleSave = function(index){
        console.log($scope.list[index].isEdit)
        $scope.list[index].isEdit = false;
    }
    $scope.handleDelete = function(index){
        $scope.list.splice(index,1)
    }
    $scope.handleAdd = function(){
        $scope.list.push($scope.newGoods)
        $scope.newGoods = {
            title:'',
            price:0,
            volume:0
        }
        $('#myModal').modal('hide')
    }
    $scope.sort = function(predicate){
        $scope.sortKeys[predicate] = !$scope.sortKeys[predicate]
        $scope.list = orderBy($scope.list,predicate,$scope.sortKeys[predicate]);
    }
    $scope.$watch('list', function(newValue, oldValue) {
        storeService.save(newValue);
    },true);

}]);
