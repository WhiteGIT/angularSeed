/**
 * Created by Administrator on 2016/4/27.
 */
//test controller
angular.module('seed').controller("publicMethod",['util','$interval','$scope',function(util,$interval,$scope){
    $scope.hInfo={"test":"test"};
    $scope.httpTest = function(){
        var begin=new Date().getTime();

        minterval =  $interval(function(){
            $scope.hInfo.begin=(new Date().getTime()-begin)/100 +"毫秒";
        },10)
        var op={
            method:'GET'
        }
        util.http("my.json",op).error(function(res){
            console.log("after erro");
            $scope.hInfo.res=res;
            $interval.cancel(minterval);
        }).success(function(res){
            $scope.hInfo.res=res;
            $interval.cancel(minterval);
        })
    }
}])
