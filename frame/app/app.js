
var app = angular.module('seed',[
        'ui.router',
        'ngAnimate',
        'angular-loading-bar'
    ]);

app.run( ['$rootScope', '$state', '$stateParams','cfpLoadingBar',
    function ($rootScope, $state, $stateParams, cfpLoadingBar) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
                cfpLoadingBar.start();
               console.log(toState);
               /*登录校验
                if(!session){
                    $rootScope.$state.go('login')
                }*/
            }
        })
     $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                cfpLoadingBar.complete();
            });
        });
    $rootScope.menuItems=[
        {
            'text':'测试目录',
            'icon':true,
            'url':'#',
            'submenu':[
                {
                    'text':'angular-strap',
                    'icon':true,
                    'url':'#',
                    'submenu':[
                        {
                            'text':'demo',
                            'url':'app.demo',
                        }
                    ]
                },
                {
                    'text':'其他插件',
                    'icon':true,
                    'url':'#'
                }
            ]
        }
    ]
}])
//全局变量
app.constant('test_data',
    {
        test:'HELLO WORLD'
    })
//路由配置
app.config(['$stateProvider', '$urlRouterProvider','$locationProvider',function($stateProvider, $urlRouterProvider, $locationProvider){
    //$locationProvider.html5Mode(false);

   $urlRouterProvider.otherwise('/app');
    var url=[
        {   state:'app',
            url:'/app',
            templateUrl:'frame/app/app.html'
        },
        {   state:'app.demo',
            url:'/demo',
            templateUrl:'Models/demo/index.html'
        }
    ]
    //路由
    angular.forEach(url,function(v){
        $stateProvider
            .state(v.state,{
                url: v.url,
                template: v.template,
                templateUrl: v.templateUrl,
                controller : v.controller
            })
    })
}]);
//进度条配置
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.includeBar = true;        //进度条
    cfpLoadingBarProvider.includeSpinner = false;  //转动图标
    cfpLoadingBarProvider.latencyThreshold = 500;  //时间

}])
//指令
app.directive('sidebar',['$window',function($window){
    return {
        restrict:'A',
        template:"<nav class='sidebar' ng-transclude></nav>",
        transclude:true,
        replace:true,
        link: function(scope, element, attrs){
            $scope   = scope;
            $(element).delegate('li','click',function(e){
                e.stopPropagation();
                $(this).children('ul').slideToggle();
            })
        }
    }
}])
//公用方法
app.factory("util",['$http','cfpLoadingBar',function($http,cfpLoadingBar){
// 头部配置
    var http =function(url,option) {
        cfpLoadingBar.start()
        console.info("into http...");
        var req={
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With' : 'XMLHttpRequest'
            },
            data: { test: 'test' }
        }
        req = angular.extend({}, req, option);
       return  $http(req).success(function(res){
           cfpLoadingBar.complete();

        }).error(function(res){
           cfpLoadingBar.complete();
        });
    }
    return {
        http : http
    }

}])
app.controller("common_http",['util','$interval','$scope',function(util,$interval,$scope){
    $scope.hInfo={};
    $scope.httpTest = function(){
        var begin=new Date().getTime();

       if(typeof minterval != 'undefined') return;

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
//animation
app.animation('.main', function ($timeout) {
    //主页面切换时候动画处理
    return{
        enter: function(element, done) {

            var el=$(element).parent();
                el.css("overflow","hidden");

            return function(cancelled){
                $timeout(function(){
                    el.css("overflow","auto");
                },500)
            }
        }

    };
});