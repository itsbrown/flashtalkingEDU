/**
 * Created by coreybrown on 3/5/15.
 */
ftEDuApp.controller("watchList",function(tCards,$scope,$rootScope,ftData,$sce){

    $scope.chapterClicked = function(){

        console.log('watchList',$rootScope.card.chapters);
    };

});