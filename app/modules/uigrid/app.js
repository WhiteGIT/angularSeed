/**
 * Created by Administrator on 2016/4/27.
 */
//test controller
angular.module('seed',[[
    __uri('../../bower_components/angular-ui-grid/ui-grid.js'),
    __uri('../../bower_components/angular-ui-grid/ui-grid.css')]]).controller("uigrid",["$scope",function($scope){
   var myData =  [{name: "Moroni", age: 50},
       {name: "Teancum", age: 43},
       {name: "Jacob", age: 27},
       {name: "Nephi", age: 29},
       {name: "Enos", age: 34}];
    $scope.gridOptions = {
        columnDefs: [
            {
                name:'姓名',field:'name',enableCellEdit: true
            },
            {
                name:'年龄',field:'age',enableCellEdit: true
            },
            {
                name:'信息',field:'age'
            }],
        data: myData};
    console.log($scope.gridOptions)

}])

