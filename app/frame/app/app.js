
var app = angular.module('seed',[
        'ui.router',
        'ngAnimate',
        'angular-loading-bar',
        "oc.lazyLoad"
    ]);
app.constant("route_url",[   //左边菜单
    {   state:'app.http',
        url:'/http',
        templateUrl:'modules/publicMethod/index.html',
        file:__uri('../../modules/publicMethod/app.js'),    //依赖文件 可以单个路径，或者数组，或者定义好的字符串变量
        controller:'publicMethod'
    },
    {   state:'app.oclazyload',
        url:'/oclazyload',
        templateUrl:'modules/oclazyload/index.html',
        file:__uri('../../modules/oclazyload/app.js'),    //依赖文件 可以单个路径，或者数组，或者定义好的字符串变量
        controller:'oclazyload'
    },
    {   state:'app.uigrid',
        url:'/uigrid',
        templateUrl:'modules/uigrid/index.html',
        file:__uri('../../modules/uigrid/app.js'),    //依赖文件 可以单个路径，或者数组，或者定义好的字符串变量
        controller:''
    }
])
app.run(function ($rootScope, $state, $stateParams, cfpLoadingBar,util,route_url,$timeout) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.route_url=route_url;
    $rootScope.msg=[];
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.msg=[];
            if (typeof(toState) !== 'undefined'){
                cfpLoadingBar.start();
                console.log("old state:"+$state.$current.name)
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

     $rootScope.$on('ocLazyLoad.componentLoaded', function(e, module) {

            $timeout(function(){
                $rootScope.msg.push('loaded:['+module+']');
            })

        });

     util.http("getMenu",{'method':'GET'}).success(function(res){
            $rootScope.menuItems=res.menu;
        })

})
//全局变量
app.constant('test_data',
    {
        test:'HELLO WORLD'
    })
//路由配置  oclazyload配置
app.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$ocLazyLoadProvider','route_url',function($stateProvider, $urlRouterProvider, $locationProvider,$ocLazyLoadProvider,route_url){
    //$locationProvider.html5Mode(false);

    $ocLazyLoadProvider.config({
         debug: true,  //打印加载的lazy模块
           events: true, //广播事件
        // modules: [{  //设置路径别名
        //    name: 'gridModule',
        //    files: [
        //       'js/gridModule.js'
        //    ]
       // }]
    });

   $urlRouterProvider.otherwise('/app');
    //路由
    angular.forEach(route_url,function(v){
        $stateProvider
            .state(v.state,{
                url: v.url,
                        controller: v.controller, // This view will use AppCtrl loaded below in the resolve
                        templateUrl: v.templateUrl,
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(v.file);
                    }]
                }
            })
         })
    $stateProvider.state('app',{
            url:'/app',
            templateUrl:'frame/app/app.html',
            controller : ["$scope",function($scope){
                $scope.$watch('keyword2',function(w,old){
                    console.log(w);
                    console.log(old);
                })

                $scope.itemClick=function(){
                    $scope.keyword2="";
                }
            }]
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
            timeout:60000,
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
    return  {
        http : http
    }

}])
//animation
app.animation('.main',["$timeout",function ($timeout) {
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
}]);

