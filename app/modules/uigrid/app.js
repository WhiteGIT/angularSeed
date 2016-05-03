/**
 * Created by Administrator on 2016/4/27.
 */
//test controller
angular.module('seed',[[
    'bower_components/angular-ui-grid/ui-grid.js',
    'bower_components/angular-ui-grid/ui-grid.css',]]).controller("uigrid",function($scope){
    $scope.lazyData="I am lazyData";
    $scope.myData = [{name: "Moroni", age: 50},
        {name: "Teancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}];
    $scope.gridOptions = {
        columnDefs: [
            {
                name:'姓名',field:'name'
            },
            {
                name:'年龄',field:'age'
            }],
        data: 'myData'};
    $scope.gridOptions2 = {data: 'myData'};
})

