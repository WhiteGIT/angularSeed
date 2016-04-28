/**
 * Created by Administrator on 2016/4/26.
 */
angular.module('seed',[]).controller("testCtr",function($scope){
    $scope.lazyData="I am lazyData";
    $scope.myData = [{name: "Moroni", age: 50},
        {name: "Teancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}];
    $scope.gridOptions = {data: 'myData'};
    })
angular.module('seed').factory("loadMyService",function(){
    var say=function(){
        alert("loadMyService")
    }
    return {
        say:say
    }
})