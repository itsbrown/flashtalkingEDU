/**
 * Created by coreybrown on 3/5/15.
 */
ftEDuApp.controller("headerNav",function(tCards,$scope,$rootScope,ftData,$sce){

    $scope.headerNavClicked = function(){

        console.log('headerNav',$rootScope.card.chapters);
    };

});