/**
 * Created by coreybrown on 3/5/15.
 */
ftEDuApp.controller("nextVideo",function(tCards,$scope,$rootScope,ftData,$sce){

    $scope.chapterClicked = function(){

        console.log('nextVideo',$rootScope.card.chapters);
    };

});