//var app = angular.module("MyApp", []);
//
//app.controller("PostsCtrl", function($scope, $http) {
//  $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
//  $http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json').
//    success(function(data, status, headers, config) {
//      $scope.posts = data;
//    });
//});


//angular.module('list', []);

//
//function ListCtrl($scope, $http) {
//    $http.get('http://localhost:81/blog_canvas/public/api/posts?searchstr=1&limit=1&page=1').success(function (data) {
////    $http({method: 'GET', url: 'data/posts.json'}).success(function(data) {
//        $scope.posts = [];
//        angular.forEach(data.data, function (value, key) {
//            $scope.posts.push(value);
//        });
//        $scope.isVisible = function (name) {
//            return true;// return false to hide this artist's albums
//        };
//    });
//}

var myApp = angular.module('myApp', ['infinite-scroll']);
angular.module('myApp').filter('unsafe', function ($sce) {
    return function (val) {
        if ((typeof val == 'string' || val instanceof String)) {
            return $sce.trustAsHtml(val);
        }
    };
});
myApp.controller('DemoController', function ($scope, GHRepo) {
    $scope.ghRepo = new GHRepo();
});

// Reddit constructor function to encapsulate HTTP and pagination logic
myApp.factory('GHRepo', function ($http) {
    var GHRepo = function () {
        this.repos = [];
        this.busy = false;
        this.page = 0
    };

    GHRepo.prototype.nextPage = function () {
        if (this.busy)
            return;
        this.busy = true;
        var url = "http://localhost:81/blog_canvas/public/api/posts?per_page=" + this.page
        $http.get(url).success(function (data) {
            var items = data.data;

            for (var i = 0; i < items.length; i++) {
                this.repos.push(items[i]);
            }
            this.page += 1
            this.busy = false;
        }.bind(this));
    };

    return GHRepo;
});