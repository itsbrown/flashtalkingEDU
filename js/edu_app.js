/**
 * Created by coreybrown on 2/19/15.
 */
var ftEDuApp = angular.module('ftEDuApp',['ngRoute','appControllers']);

var appControllers = angular.module('appControllers',[]);


ftEDuApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/videoPlayer',{
            templateUrl: 'views/videoPlayer.html',
            controller: 'videoPlayer'
        }).
        when('/videoQueue',{
            templateUrl: 'views/videoQueue.html',
            controller: 'videoQueue'
        }).
        when('/chapterMenu',{
            templateUrl: 'views/chapterMenu.html',
            controller: 'chapterMenu'
        }).
        when('/dropDownMenu',{
            templateUrl: 'views/dropDownMenu.html',
            controller: 'dropDownMenu'
        }).
        when('/newsFeed',{
            templateUrl: 'views/newsFeed.html',
            controller: 'newsFeed'
        }).
        when('/tutorialCards',{
            templateUrl: 'views/tutorialCards.html',
            controller: 'tutorialCards'
        }).
        when('/forumFeed',{
            templateUrl: 'views/forumFeed.html',
            controller: 'forumFeed'
        });
}]);
